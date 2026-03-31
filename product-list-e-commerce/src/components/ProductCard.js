import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <p>{product.category}</p>
    </div>
  );
};

export default ProductCard;