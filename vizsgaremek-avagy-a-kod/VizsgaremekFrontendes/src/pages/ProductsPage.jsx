import { useState } from "react";
import ProductCard from "../components/ProductCard";
import { products } from "../data/mockData";

export default function ProductsPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("new");

  const filtered = products
    .filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase().trim())
    )
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return b.id - a.id;
    });

  return (
    <div className="page page-products">
      <header className="page-header">
        <h1>Termékek</h1>

        <div className="products-filters">
          <input
            className="search-input"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            className="select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="new">New</option>
            <option value="price-asc">Price ascending</option>
            <option value="price-desc">Price descending</option>
          </select>
        </div>
      </header>

      <div className="product-grid">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
