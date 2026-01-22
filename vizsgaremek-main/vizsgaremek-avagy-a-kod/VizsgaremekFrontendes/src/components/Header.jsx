
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { itemCount } = useCart();

  return (
    <header className="site-header">
      <div className="header-inner container">
        {/* LOGO */}
        <Link to="/" className="logo">
          <span className="logo-mark" />
          <span className="logo-text">InteriorShop</span>
        </Link>

        {/* NAV */}
        <nav className="main-nav">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Főoldal
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " nav-link-active" : "")
            }
          >
            Termékek
          </NavLink>
        </nav>

        {/* AKCIÓK: kosár + belépés */}
        <div className="header-actions">
          <Link to="/cart" className="icon-button cart-button">
            <img src="/images/kosar.png" className="header-icon" />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
                    
          <Link to="/login" className="icon-button login-button">
            <img src="/images/user.png" className="header-icon" />
            <span className="login-text">Belépés</span>
          </Link>

        </div>
      </div>
    </header>
  );
}
