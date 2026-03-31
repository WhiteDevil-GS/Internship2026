import React from "react";

const Filter = ({ setCategory }) => {
  return (
    <div className="filter">
      <button onClick={() => setCategory("All")}>All</button>
      <button onClick={() => setCategory("Electronics")}>Electronics</button>
      <button onClick={() => setCategory("Fashion")}>Fashion</button>
    </div>
  );
};

export default Filter;