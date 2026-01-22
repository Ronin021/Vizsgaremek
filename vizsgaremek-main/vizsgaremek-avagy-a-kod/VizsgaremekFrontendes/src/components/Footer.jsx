
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-col">
          <h3>InteriorShop</h3>
          <p>
            Belsőépítészeti webshop a legszebb lakberendezési termékekkel.
          </p>
        </div>

        <div className="footer-col">
          <h4>Linkek</h4>
          <ul>
            <li>
              <Link to="/">Főoldal</Link>
            </li>
            <li>
              <Link to="/products">Termékek</Link>
            </li>
            <li>
              <a href="#!">Rólunk</a>
            </li>
            <li>
              <a href="#!">Kapcsolat</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Ügyfélszolgálat</h4>
          <ul>
            <li>
              <a href="#!">ÁSZF</a>
            </li>
            <li>
              <a href="#!">Adatvédelem</a>
            </li>
            <li>
              <a href="#!">Szállítás</a>
            </li>
            <li>
              <a href="#!">Reklamáció</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Kapcsolat</h4>
          <p>+36 1 234 5678</p>
          <p>info@interiorshop.hu</p>
          <div className="footer-social">
            <span>f</span>
            <span>in</span>
            <span>ig</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© 2025 InteriorShop. Minden jog fenntartva.</span>
          <span>
            Projekt: Wrabel-Bencsik Botond (Frontend) | Lavro Sándor (Backend)
          </span>
        </div>
      </div>
    </footer>
  );
}
