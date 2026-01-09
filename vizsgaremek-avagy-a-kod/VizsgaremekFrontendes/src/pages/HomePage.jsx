import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FeatureStrip from "../components/FeatureStrip";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi.js";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const products = await getProducts();
        setFeatured(products.slice(0, 4));
      } catch (err) {
        console.error("Termékek betöltése sikertelen", err);
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  return (
    <div className="page page-home">
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <h1>Fedezd fel az otthonod szépségét</h1>
            <p>
              Prémium belsőépítészeti termékek és bútorok széles választéka.
              Alakítsd át otthonod stílusos és kényelmes térré.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-black">
                Termékek böngészése
              </Link>
              <button className="btn btn-light">Tudd meg többet</button>
            </div>
          </div>
          <div className="hero-image-card">
            <img src="/images/kep3.jpg" />
          </div>
        </div>
      </section>


      <section className="hero-features">
        <div className="container">
          <FeatureStrip />
        </div>
      </section>


      <section className="section section-featured">
        <div className="container">
          <header className="section-header">
            <h2>Kiemelt termékek</h2>
            <p>Válogatott termékeink a legmagasabb minőséget képviselik</p>
          </header>

          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="section-footer-center">
            <Link to="/products" className="btn btn-outline-dark">
              Összes termék megtekintése →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
