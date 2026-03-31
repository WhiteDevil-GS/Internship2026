import React, { useState } from "react";
import ProductCard from "./components/ProductCard";
import Filter from "./components/Filter";
import products from "./data/products";
import "./styles.css";

function App() {
  const [category, setCategory] = useState("All");

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((item) => item.category === category);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h1 className="logo">GS Store</h1>
      </nav>

      {/* Header */}
      <div className="header">
        <h2>Explore Premium Products</h2>
        <p>Best deals. Best quality.</p>
      </div>

      {/* Filters */}
      <Filter setCategory={setCategory} />

      {/* Products */}
      <div className="grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;