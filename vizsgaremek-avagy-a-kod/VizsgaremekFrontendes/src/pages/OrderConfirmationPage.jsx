import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { request } from "../api/client.js";
import { getCategories } from "../api/adminApi.js";
import { useAuth } from "../context/AuthContext";

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        const [orderData, itemsData, categoriesData] = await Promise.all([
          request(`/api/orders/${orderId}`),
          request(`/api/orderItems/order/${orderId}`),
          getCategories(),
        ]);

        setOrder(orderData);
        setItems(itemsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Rendelés visszaigazolás betöltése sikertelen", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [orderId]);

  const consolidatedItems = useMemo(() => {
    const consolidated = [];
    items.forEach((item) => {
      const existing = consolidated.find((i) => i.product_id === item.product_id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        consolidated.push({ ...item });
      }
    });
    return consolidated;
  }, [items]);

  const itemsSubtotal = useMemo(
    () =>
      consolidatedItems.reduce(
        (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0),
        0
      ),
    [consolidatedItems]
  );

  const shipping = itemsSubtotal >= 150000 ? 0 : 5000;
  const orderTotal = order?.total_price ?? itemsSubtotal + shipping;

  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name || "Egyéb";
  };

  const buyerName =
    `${order?.customer_first_name || ""} ${order?.customer_last_name || ""}`.trim() ||
    location.state?.buyerName ||
    (user ? `${user.first_name || ""} ${user.last_name || ""}`.trim() : "") ||
    "Ismeretlen";

  const buyerEmail = (order?.customer_email || "").trim() || location.state?.buyerEmail || user?.email || "N/A";

  const formatOrderDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    const utcDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
    return utcDate.toLocaleDateString("hu-HU");
  };

  const parseImages = (imageField) => {
    if (!imageField) return [];
    try {
      const parsed = JSON.parse(imageField);
      if (Array.isArray(parsed)) return parsed;
      return [imageField];
    } catch {
      return imageField ? [imageField] : [];
    }
  };

  if (loading) {
    return (
      <div className="page page-order-confirmation">
        <div className="container cart-empty">
          <img src="/images/kosar.png" alt="Betöltés" className="cart-empty-icon" />
          <h1>Rendelés adatai betöltése...</h1>
          <p>Kérlek, várj egy pillanatot.</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="page page-order-confirmation">
        <div className="container cart-empty">
          <img src="/images/kosar.png" alt="Nincs rendelés" className="cart-empty-icon" />
          <h1>Rendelés nem található</h1>
          <p>Nem találtunk visszaigazolható rendelést ehhez az azonosítóhoz.</p>
          <Link to="/products" className="btn btn-black">Termékek böngészése</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-order-confirmation page-order-detail">
      <div className="container">
        <section className="order-success-banner">
          <div className="order-success-icon">✓</div>
          <div>
            <h1>Sikeres rendelés!</h1>
            <p>
              Köszönjük a vásárlást. A megrendelést rögzítettük és hamarosan feldolgozzuk.
            </p>
            <p className="order-success-id">Rendelésszám: #{order.id}</p>
          </div>
        </section>

        <div className="order-detail-grid">
          <div className="order-detail-left">
            <h2>Megrendelt termékek</h2>
            {consolidatedItems.length === 0 ? (
              <p>Nincsenek tételek ebben a rendelésben.</p>
            ) : (
              <div className="order-items-container">
                {consolidatedItems.map((item) => {
                  const productImages = parseImages(item.product?.image);
                  const mainImage = productImages.length > 0 ? productImages[0] : "";

                  return (
                    <div key={item.id} className="order-item-card">
                      {mainImage && (
                        <div className="item-image">
                          <img
                            src={mainImage}
                            alt={item.product?.name}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      )}
                      <div className="item-details">
                        <h3>{item.product?.name}</h3>
                        <p className="item-category">{getCategoryName(item.product?.category_id)}</p>
                        <p className="item-price">{(item.product?.price || 0).toLocaleString("hu-HU")} Ft</p>
                        <p className="item-quantity">
                          Mennyiség: <strong>{item.quantity}</strong>
                        </p>
                        <p className="item-subtotal">
                          Összesen: <strong>{((item.product?.price || 0) * item.quantity).toLocaleString("hu-HU")} Ft</strong>
                        </p>
                        {item.product?.description && (
                          <p className="item-description">{item.product.description}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="order-summary-box">
              <div className="summary-row">
                <span>Részösszeg:</span>
                <span>{itemsSubtotal.toLocaleString("hu-HU")} Ft</span>
              </div>
              <div className="summary-row">
                <span>Szállítás:</span>
                <span>{shipping === 0 ? "Ingyenes" : `${shipping.toLocaleString("hu-HU")} Ft`}</span>
              </div>
              <div className="summary-row summary-total">
                <span>Végösszesen:</span>
                <span>{orderTotal.toLocaleString("hu-HU")} Ft</span>
              </div>
            </div>
          </div>

          <div className="order-detail-right">
            <div className="info-section">
              <h3>Ügyfél adatai</h3>
              <div className="info-group">
                <label>Név:</label>
                <p>{buyerName}</p>
              </div>
              <div className="info-group">
                <label>E-mail:</label>
                <p>{buyerEmail}</p>
              </div>
            </div>

            <div className="info-section">
              <h3>Szállítási adatok</h3>
              <div className="info-group">
                <label>Szállítási cím:</label>
                <p>{order.shipping_address || "-"}</p>
              </div>
              <div className="info-group">
                <label>Telefon:</label>
                <p>{order.phone || "-"}</p>
              </div>
            </div>

            <div className="info-section">
              <h3>Megrendelés adatai</h3>
              <div className="info-group">
                <label>Fizetési mód:</label>
                <p>{order.payment_method || "Utánvét"}</p>
              </div>
              <div className="info-group">
                <label>Dátum:</label>
                <p>{formatOrderDate(order.date)}</p>
              </div>
              <div className="info-group">
                <label>Státusz:</label>
                <p>{order.status || "Feldolgozás alatt"}</p>
              </div>
            </div>

            <div className="order-success-actions">
              <Link to="/products" className="btn btn-black full-width">További vásárlás</Link>
              <button className="btn btn-light full-width" onClick={() => navigate("/")} type="button">
                Vissza a főoldalra
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
