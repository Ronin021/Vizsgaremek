import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { request } from "../api/client.js";
import { getActiveOrderId } from "../api/orderApi.js";

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  // only cash-on-delivery is allowed
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isLoggedIn) {
    return (
      <div className="page page-checkout">
        <div className="container cart-empty">
          <img src="/images/user.png" alt="Bejelentkezés" className="cart-empty-icon" />
          <h1>Bejelentkezés szükséges</h1>
          <p>A vásárláshoz kérlek, jelentkezz be fiókodba.</p>
          <Link to="/login" className="btn btn-black">
            Bejelentkezés
          </Link>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="page page-checkout">
        <div className="container">
          <h1>Fizetés</h1>
          <p>A kosár üres.</p>
          <Link to="/products" className="btn btn-black">
            Termékek böngészése
          </Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validáció - kötelező mezők
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !phone.trim() || !address.trim() || !city.trim() || !zipCode.trim()) {
      setError("Kérlek, töltsd ki az összes mezőt!");
      return;
    }

    setLoading(true);

    try {
      const shippingAddress = `${address}, ${zipCode} ${city}`;
      
      // Get local date (not UTC) - avoid timezone issues
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const localDate = `${yyyy}-${mm}-${dd}`;
      
      console.log("📅 Küldött dátum:", localDate, "ma van:", today.toLocaleDateString("hu-HU"));
      
      // Create order with payment details
      const orderData = {
        user_id: user?.id,
        total_price: total,
        date: localDate,
        status: "Feldolgozás alatt",
        payment_method: paymentMethod === "credit-card" ? "Bankkártya" : "Utánvét",
        shipping_address: shippingAddress,
        phone: phone
      };

      // If there is an active cart order, update it with the checkout details
      const activeOrderId = getActiveOrderId();
      if (activeOrderId) {
        await request(`/api/orders/${activeOrderId}`, {
          method: "PUT",
          body: orderData
        });

        // mark order as completed in UI and clear active order id (cart)
        clearCart();
        navigate(`/order-success/${Number(activeOrderId)}`);
      } else {
        // fallback: create a fresh order (guest flow)
        const response = await request("/api/orders", {
          method: "POST",
          body: orderData
        });
        navigate(`/order-success/${response.id}`);
      }
    } catch (err) {
      setError(err.message || "Hiba a megrendelés során");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page-checkout">
      <div className="container checkout-layout">
        <section className="checkout-form">
          <h1>Fizetés</h1>

          <h2>Szállítási adatok</h2>
          <div className="form-grid">
            <label>
              Teljes név
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Keresztnév"
                required
              />
            </label>
            <label>
              Vezetéknév
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Vezetéknév"
                required
              />
            </label>
            <label>
              Email
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail cím"
                required
              />
            </label>
          </div>

          <div className="form-grid">
            <label>
              Cím
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Utca, házszám"
                required
                style={{ gridColumn: "1 / 3" }}
              />
            </label>
            <label>
              Város
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Város"
                required
              />
            </label>
            <label>
              Irányítószám
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="Irányítószám"
                required
              />
            </label>
            <label>
              Telefonszám
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/[^0-9+]/g, ""))}
                placeholder="+36201234567"
                required
                style={{ gridColumn: "1 / 3" }}
              />
            </label>
          </div>

          <h2>Fizetési mód</h2>
          <div className="payment-methods">
            <div className="payment-note">
              Utánvét — fizetés készpénzben a kiszállításkor.
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button
            className="btn btn-black full-width"
            type="button"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Feldolgozás..." : "Megrendelés"}
          </button>

          <Link to="/cart" className="btn btn-light full-width">
            Vissza a kosárhoz
          </Link>
        </section>

        <aside className="checkout-summary">
          <h2>Megrendelés összesítése</h2>

          <div className="summary-items">
            {items.map((item) => {
              const product = item.product ?? item;
              const quantity = item.quantity ?? 1;
              const price = product.price ?? 0;
              return (
                <div key={item.id} className="summary-item">
                  <span className="item-name">{product.name}</span>
                  <span className="item-qty">x{quantity}</span>
                  <span className="item-price">
                    {(price * quantity).toLocaleString("hu-HU")} Ft
                  </span>
                </div>
              );
            })}
          </div>

          <dl className="summary-totals">
            <div className="summary-row">
              <dt>Részösszeg</dt>
              <dd>{subtotal.toLocaleString("hu-HU")} Ft</dd>
            </div>
            <div className="summary-row">
              <dt>Szállítás</dt>
              <dd>
                {shipping === 0
                  ? "Ingyenes"
                  : `${shipping.toLocaleString("hu-HU")} Ft`}
              </dd>
            </div>
            <div className="summary-row summary-row-total">
              <dt>Összesen</dt>
              <dd>{total.toLocaleString("hu-HU")} Ft</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
