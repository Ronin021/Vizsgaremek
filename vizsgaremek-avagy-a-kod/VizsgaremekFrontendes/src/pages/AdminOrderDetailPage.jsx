import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { updateOrder, deleteOrder, getCategories, getUsers } from "../api/adminApi.js";
import { request } from "../api/client.js";

export default function AdminOrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [buyers, setBuyers] = useState([]);

  // Check admin access
  useEffect(() => {
    if (!isLoggedIn || !user?.is_admin) {
      navigate("/");
    }
  }, [isLoggedIn, user, navigate]);

  // Fetch order and items
  useEffect(() => {
    async function fetchData() {
      try {
        const orderData = await request(`/api/orders/${orderId}`);
        setOrder(orderData);
        setStatusValue(orderData.status);

        const itemsData = await request(`/api/orderItems/order/${orderId}`);
        setItems(itemsData);

        const categoriesData = await getCategories();
        setCategories(categoriesData);

        const usersData = await getUsers();
        setBuyers(usersData);
      } catch (err) {
        console.error("Rendelés betöltése sikertelen", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [orderId]);

  // Get category name
  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name || "Egyéb";
  };

  // Get user name
  const getUserName = (userId) => {
    const u = buyers.find((usr) => usr.id === userId);
    return u ? `${u.first_name} ${u.last_name}` : "Ismeretlen";
  };

  // Parse dates correctly from database (stored as UTC YYYY-MM-DD)
  const formatOrderDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split('-');
    // Parse as UTC date, then format to local timezone
    const utcDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)));
    return utcDate.toLocaleDateString("hu-HU");
  };

  // Parse images
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

  // Handle status change
  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    setStatusValue(newStatus);
  };

  // Save status
  const handleSaveStatus = async () => {
    if (!order) return;
    setSaving(true);
    try {
      // Frissítjük az egész rendelést, de csak a status-t megváltoztatva
      const updatedOrder = {
        user_id: order.user_id,
        total_price: order.total_price,
        date: order.date,
        status: statusValue,
        payment_method: order.payment_method,
        shipping_address: order.shipping_address,
        phone: order.phone
      };
      await updateOrder(order.id, updatedOrder);
      setOrder({ ...order, status: statusValue });
      alert("Status sikeresen módosítva!");
    } catch (err) {
      console.error("Status módosítás sikertelen", err);
      alert("Hiba történt a status módosítása során");
    } finally {
      setSaving(false);
    }
  };

  // Delete order
  const handleDeleteOrder = async () => {
    if (!window.confirm(`Biztosan törölni szeretnéd a ${order.id}. rendelést? Ez a művelet nem vonható vissza!`)) {
      return;
    }
    setSaving(true);
    try {
      await deleteOrder(order.id);
      alert("Rendelés sikeresen törölve!");
      navigate("/admin?tab=orders");
    } catch (err) {
      console.error("Törlés sikertelen", err);
      alert("Hiba történt a törlés során");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page page-order-detail">
        <div className="container">
          <p>Betöltés...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="page page-order-detail">
        <div className="container">
          <p>Rendelés nem található.</p>
        </div>
      </div>
    );
  }

  const images = items.length > 0 && items[0].product?.image 
    ? parseImages(items[0].product.image) 
    : [];

  // Consolidate items by product_id (ha ugyanaz a termék többször van, összességes mennyiség)
  const consolidatedItems = [];
  items.forEach((item) => {
    const existing = consolidatedItems.find(
      (i) => i.product_id === item.product_id
    );
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      consolidatedItems.push({ ...item });
    }
  });

  const itemsSubtotal = consolidatedItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * (item.quantity || 0),
    0
  );
  const shipping = itemsSubtotal >= 150000 ? 0 : 5000;
  const total = itemsSubtotal + shipping;

  return (
    <div className="page page-order-detail">
      <div className="container">
        {/* Header */}
        <div className="order-detail-header">
          <button className="btn btn-back" onClick={() => navigate("/admin?tab=orders")}>
            ← Vissza
          </button>
          <h1>Rendelés #{order.id}</h1>
        </div>

        <div className="order-detail-grid">
          {/* Left Column - Termékek */}
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
                        <p className="item-category">
                          {getCategoryName(item.product?.category_id)}
                        </p>
                        <p className="item-price">
                          {(item.product?.price || 0).toLocaleString("hu-HU")} Ft
                        </p>
                        <p className="item-quantity">
                          Mennyiség: <strong>{item.quantity}</strong>
                        </p>
                        <p className="item-subtotal">
                          Összesen: <strong>
                            {((item.product?.price || 0) * item.quantity).toLocaleString("hu-HU")} Ft
                          </strong>
                        </p>
                        {item.product?.description && (
                          <p className="item-description">
                            {item.product.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Order Summary */}
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
                <span>{total.toLocaleString("hu-HU")} Ft</span>
              </div>
            </div>
          </div>

          {/* Right Column - Szállítási adatok & Status */}
          <div className="order-detail-right">
            {/* Customer Info */}
            <div className="info-section">
              <h3>Ügyfél adatai</h3>
              <div className="info-group">
                <label>Név:</label>
                <p>{getUserName(order.user_id)}</p>
              </div>
              <div className="info-group">
                <label>E-mail:</label>
                <p>{buyers.find(u => u.id === order.user_id)?.email || "N/A"}</p>
              </div>
            </div>

            {/* Shipping Info */}
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

            {/* Payment & Date Info */}
            <div className="info-section">
              <h3>Megrendelés adatai</h3>
              <div className="info-group">
                <label>Fizetési módszer:</label>
                <p>{order.payment_method || "Utánvét"}</p>
              </div>
              <div className="info-group">
                <label>Dátum:</label>
                <p>{formatOrderDate(order.date)}</p>
              </div>
            </div>

            {/* Status Control */}
            <div className="status-section">
              <h3>Rendelés státusza</h3>
              <select
                value={statusValue}
                onChange={handleStatusChange}
                className="status-select"
              >
                <option value="Feldolgozás alatt">Feldolgozás alatt</option>
                <option value="Szállítás alatt">Szállítás alatt</option>
                <option value="Kiszállítva">Kiszállítva</option>
              </select>
              <button
                className="btn btn-primary"
                onClick={handleSaveStatus}
                disabled={saving || statusValue === order.status}
              >
                {saving ? "Mentés..." : "Mentés"}
              </button>
            </div>

            {/* Delete Order */}
            <div className="danger-section">
              <h3>Veszélyes zóna</h3>
              <button
                className="btn btn-danger"
                onClick={handleDeleteOrder}
                disabled={saving}
              >
                {saving ? "Törlés..." : "Rendelés törlése"}
              </button>
              <p className="danger-text">Ez a művelet véglegesen törli a rendelést.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
