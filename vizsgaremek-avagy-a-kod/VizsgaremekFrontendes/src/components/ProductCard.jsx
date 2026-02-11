
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, categoryName }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-meta">
          <span className="product-category">{categoryName ?? product.category ?? ''}</span>
          <h3 className="product-title">{product.name}</h3>
          <p className="product-price">{product.price.toLocaleString("hu-HU")} Ft</p>
        </div>
      </Link>

      <div className="product-actions">
        {product.stock === 0 ? (
          <span className="stock-badge">Nincs raktáron</span>
        ) : (
          <button
            type="button"
            className="btn btn-black"
            onClick={() => addToCart(product.id, 1)}
          >
            Kosárba
          </button>
        )}
      </div>
    </article>
  );
}
