import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProductById } from "../api/productApi.js";
import { useCart } from "../context/CartContext";

// Helper: parse image field (JSON array or single URL)
function parseImages(imageField) {
  if (!imageField) return [];
  try {
    const parsed = JSON.parse(imageField);
    if (Array.isArray(parsed)) return parsed;
    return [imageField];
  } catch {
    return imageField ? [imageField] : [];
  }
}

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
            {(() => {
              const images = parseImages(product.image);
              if (images.length === 0) {
                return <div className="product-detail-image-placeholder" />;
              }
              return (
                <div className="image-carousel">
                  {images.length > 1 && (
                    <button
                      className="carousel-arrow carousel-arrow-left"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      aria-label="Előző kép"
                    >
                      ‹
                    </button>
                  )}
                  <img
                    src={images[currentImageIndex] || images[0]}
                    alt={`${product.name} - ${currentImageIndex + 1}`}
                  />
                  {images.length > 1 && (
                    <button
                      className="carousel-arrow carousel-arrow-right"
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      aria-label="Következő kép"
                    >
                      ›
                    </button>
                  )}
                  {images.length > 1 && (
                    <div className="carousel-dots">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          className={`carousel-dot ${idx === currentImageIndex ? "active" : ""}`}
                          onClick={() => setCurrentImageIndex(idx)}
                          aria-label={`Kép ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
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
