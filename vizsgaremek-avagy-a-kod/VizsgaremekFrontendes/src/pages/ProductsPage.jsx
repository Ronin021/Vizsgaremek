import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi.js";
import { request } from "../api/client.js";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const defaultCategoryNames = {
    1: "Nappali",
    2: "Hálószoba",
    3: "Étkező",
    4: "Dekoráció",
    5: "Világítás",
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        setError("Termékek betöltése sikertelen");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
    // fetch categories
    async function fetchCategories() {
      try {
        const cats = await request("/api/categories");
        if (Array.isArray(cats) && cats.length > 0) {
          setCategories(cats);
        } else {
          console.warn("/api/categories returned empty or non-array, will use product-derived or default names");
        }
      } catch (err) {
        console.error("Kategóriák betöltése sikertelen", err);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="page page-products">
        <div className="container">
          <p>Termékek betöltése...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page page-products">
        <div className="container">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  const filtered = products
    .filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase().trim()) &&
      (category === "all" || Number(p.category_id) === Number(category))
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.id - a.id;
    });

  return (
    <div className="page page-products">
      <div className="container">
        <div className="products-header">
          <h1>Termékek</h1>
        </div>

        <div className="products-filters">
          <div className="filter-search">
            <input
              placeholder="Keresés..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="filter-select">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="all">Összes</option>
              {(categories.length ? categories : [])
                .map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {c.name}
                  </option>
                ))}
              {categories.length === 0 && (
                // fallback: derive categories from products if API not available
                products
                  .reduce((acc, p) => {
                    if (!acc.find((x) => x.id === p.category_id)) {
                      const name = p.category ?? defaultCategoryNames[p.category_id] ?? `Kategória ${p.category_id}`;
                      acc.push({ id: p.category_id, name });
                    }
                    return acc;
                  }, [])
                  .map((c) => (
                    <option key={c.id} value={String(c.id)}>
                      {c.name}
                    </option>
                  ))
              )}
            </select>
          </div>

          <div className="filter-select">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="new">Név szerint</option>
              <option value="price-asc">Ár (növekvő)</option>
              <option value="price-desc">Ár (csökkenő)</option>
            </select>
          </div>
        </div>

        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
