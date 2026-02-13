import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductById } from "../api/productApi.js";
import { useCart } from "../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Termék betöltése sikertelen");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="page page-product-detail">
        <div className="container">
          <p>Termék betöltése...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page page-product-detail">
        <div className="container">
          <p>{error || "Termék nem található."}</p>
          <Link to="/products" className="btn btn-black">
            Vissza a termékekhez
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-product-detail">
      <div className="container">
        <Link to="/products" className="back-link">
          ← Vissza a termékekhez
        </Link>

        <div className="product-detail-layout">
          <div className="product-detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-main">
            <span className="detail-category">{product.category_name}</span>

            <h1 className="detail-title">{product.name}</h1>

            <p className="detail-price">
              {product.price.toLocaleString("hu-HU")} Ft
              <span className={`detail-stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
                {product.stock > 0 ? "Raktáron" : "Nincs raktáron"}
              </span>
            </p>

            <p className="detail-description">
              {product.description ??
                "Kortárs stílusú LED világítás. Állítható fényerővel és energiatakarékos technológiával."}
            </p>

            {product.stock > 0 ? (
              <button
                className="btn btn-black detail-add-btn"
                onClick={() => addToCart(product.id, 1)}
              >
                Kosárba helyezés
              </button>
            ) : (
              <button className="btn btn-disabled detail-add-btn" disabled>
                Kosárba
              </button>
            )}

            <ul className="detail-benefits">
              <li>📦 <strong>Prémium minőség</strong> – kiváló alapanyagokból készült</li>
              <li>🚚 <strong>Gyors szállítás</strong> – 3–5 munkanapon belül kiszállítjuk</li>
              <li>🛡 <strong>2 év garancia</strong> – teljes körű garanciális szolgáltatás</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
