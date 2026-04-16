
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";

export default function Header() {
  const { itemCount } = useCart();
  const { isLoggedIn, logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    logout();
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner container">
        {/* LOGO */}
        <Link to="/" className="logo" onClick={closeMobileMenu}>
          <span className="logo-mark" />
          <span className="logo-text">InteriorShop</span>
        </Link>

        {/* Mobile Overlay - háttér amikor nyitva van a menü */}
        {mobileMenuOpen && (
          <div className="mobile-overlay" onClick={closeMobileMenu}></div>
        )}

        {/* NAV */}
        <nav className={`main-nav ${mobileMenuOpen ? "mobile-nav-open" : ""}`}>
          {/* Top section - felhasználó info */}
          <div className="mobile-nav-top">
            {isLoggedIn ? (
              <div className="mobile-user-info">
                <img src="/images/user.png" className="header-icon" alt="" />
                <span className="user-name">{user?.first_name}</span>
              </div>
            ) : (
              <span className="mobile-user-info">Vendég</span>
            )}
          </div>

          {/* Navigation links */}
          <div className="mobile-nav-links">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " nav-link-active" : "")
              }
              onClick={closeMobileMenu}
            >
              Főoldal
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                "nav-link" + (isActive ? " nav-link-active" : "")
              }
              onClick={closeMobileMenu}
            >
              Termékek
            </NavLink>
            {isLoggedIn && user?.is_admin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " nav-link-active" : "")
                }
                onClick={closeMobileMenu}
              >
                Admin
              </NavLink>
            )}

            {/* Egyéb linkek */}
            <NavLink 
              to="/aszf" 
              className="nav-link"
              onClick={closeMobileMenu}
            >
              ÁSZF
            </NavLink>
            <NavLink 
              to="/adatvedelem" 
              className="nav-link"
              onClick={closeMobileMenu}
            >
              Adatvédelem
            </NavLink>
            <NavLink 
              to="/szallitas" 
              className="nav-link"
              onClick={closeMobileMenu}
            >
              Szállítás
            </NavLink>
            <NavLink 
              to="/reklamacio" 
              className="nav-link"
              onClick={closeMobileMenu}
            >
              Reklamáció
            </NavLink>
            <NavLink 
              to="/rolunk" 
              className="nav-link"
              onClick={closeMobileMenu}
            >
              Rólunk
            </NavLink>
            <NavLink 
              to="/kapcsolat" 
              className="nav-link"
              onClick={closeMobileMenu}
            >
              Kapcsolat
            </NavLink>
          </div>

          {/* Desktop nav */}
          <div className="desktop-nav-links">
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
            {isLoggedIn && user?.is_admin && (
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " nav-link-active" : "")
                }
              >
                Admin
              </NavLink>
            )}
          </div>
        </nav>

        {/* AKCIÓK: kosár + belépés */}
        <div className="header-actions">
          <Link to="/cart" className="icon-button cart-button">
            <img src="/images/kosar.png" className="header-icon" alt="Kosár" />
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>

          {/* Hamburger Button - csak mobilon */}
          <button 
            className="hamburger-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Menü"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
                    
          {isLoggedIn ? (
            <div className="user-section">
              <span className="user-name user-name-desktop">
                {user?.first_name}
              </span>
              <button 
                className="icon-button login-button"
                onClick={handleLogout}
                title="Kijelentkezés"
              >
                <img src="/images/user.png" className="header-icon" alt="" />
                <span className="login-text">Kilépés</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="icon-button login-button">
              <img src="/images/user.png" className="header-icon" alt="" />
              <span className="login-text">Belépés</span>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}
