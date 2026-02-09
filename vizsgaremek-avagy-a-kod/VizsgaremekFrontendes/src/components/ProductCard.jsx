
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-link">
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.name} />
        </div>

        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">
            {product.price.toLocaleString("hu-HU")} Ft
          </p>
        </div>
      </Link>

      <div className="product-actions">
        <button
          type="button"
          className="product-button"
          onClick={() => addToCart(product.id, 1)}
        >
          Kosárba
        </button>
      </div>
    </article>
  );
}
