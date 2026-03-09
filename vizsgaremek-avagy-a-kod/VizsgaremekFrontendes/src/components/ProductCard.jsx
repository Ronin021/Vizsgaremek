
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

// Helper: parse image field (JSON array or single URL)
function getFirstImage(imageField) {
  if (!imageField) return "";
  try {
    const parsed = JSON.parse(imageField);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
    return imageField;
  } catch {
    return imageField;
  }
}

export default function ProductCard({ product, categoryName }) {
  const { addToCart } = useCart();
  const imageSrc = getFirstImage(product.image);

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image">
          {imageSrc ? (
            <img src={imageSrc} alt={product.name} />
          ) : (
            <div className="product-image-placeholder" />
          )}
        </div>

        <div className="product-meta">
          <span className="product-category">{categoryName ?? product.category_name ?? ''}</span>
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">{product.price.toLocaleString("hu-HU")} Ft</p>
        </div>
      </Link>

      <div className="product-actions">
        <span className={`stock-badge ${product.stock > 0 ? "stock-in" : "stock-out"}`}>
          {product.stock > 0 ? "Raktáron" : "Nincs raktáron"}
        </span>
        {product.stock > 0 ? (
          <button
            type="button"
            className="btn btn-black"
            onClick={() => addToCart(product.id, 1)}
          >
            Kosárba
          </button>
        ) : (
          <button type="button" className="btn btn-disabled" disabled>
            Kosárba
          </button>
        )}
      </div>
    </article>
  );
}
