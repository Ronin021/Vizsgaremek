
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    items,
    loading,
    updateQuantity,
    removeFromCart,
    subtotal,
    shipping,
    total,
  } = useCart();

  const navigate = useNavigate();

  // Betöltés alatt
  if (loading) {
    return (
      <div className="page page-cart">
        <div className="container cart-empty">
          <div className="cart-empty-icon" />
          <h1>Kosár betöltése…</h1>
          <p>Kérlek, várj egy pillanatot.</p>
        </div>
      </div>
    );
  }

  const isEmpty = !items || items.length === 0;

// ÜRES KOSÁR NÉZET
if (isEmpty) {
  return (
    <div className="page page-cart">
      <div className="container cart-empty">
        <img src="/images/kosar.png" alt="Üres kosár" className="cart-empty-icon" />
        <h1>A kosár üres</h1>
        <p>Még nem adtál hozzá terméket a kosárhoz.</p>
        <Link to="/products" className="btn btn-black">
          Termékek böngészése
        </Link>
      </div>
    </div>
  );
}


  // NEM ÜRES KOSÁR
  return (
    <div className="page page-cart">
      <div className="container cart-layout">
        <section className="cart-items">
          <h1>Kosár</h1>

          {items.map((item) => {
            const product = item.product ?? item; // ha nincs product mező, magát az item-et használjuk
            const quantity = item.quantity ?? 1;
            const price = product.price ?? item.price ?? 0;

            const key = item.id ?? item.itemId ?? product.id;

            return (
              <article key={key} className="cart-item">
                <div className="cart-item-image">
                  <img src="/images/kosar.png" />
                </div>

                <div className="cart-item-main">
                  <h2>{product.name}</h2>
                  <p>{price.toLocaleString("hu-HU")} Ft</p>
                </div>

                <div className="cart-item-qty">
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id ?? item.itemId, quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id ?? item.itemId, quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  {(price * quantity).toLocaleString("hu-HU")} Ft
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.id ?? item.itemId)}
                  type="button"
                >
                  🗑
                </button>
              </article>
            );
          })}
        </section>

        <aside className="cart-summary">
          <h2>Összesítés</h2>

          <dl>
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

          {subtotal < 150000 && (
            <p className="shipping-note">
              Még{" "}
              {(150000 - subtotal).toLocaleString("hu-HU")} Ft és ingyenes a
              szállítás!
            </p>
          )}

          <button
            className="btn btn-black"
            type="button"
            onClick={() => navigate("/checkout")}
          >
            Tovább a fizetéshez
          </button>

          <Link to="/products" className="btn btn-light full-width">
            Vásárlás folytatása
          </Link>
        </aside>
      </div>
    </div>
  );
}
