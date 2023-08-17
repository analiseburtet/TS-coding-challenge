import React, { useEffect, useState } from "react";
import productsData from "./products";

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState()

  const filteredProducts =
    selectedCategory === "All"
      ? productsData
      : productsData.filter((product) => product.category === selectedCategory);

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };


  useEffect(() => {
    setCartTotal(cartItems.reduce().toFixed(2));
  }, cartTotal)

  return (
    <div>
      <h1>Product List</h1>
      <div>
        <label htmlFor="category">Filter by category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Category A">Category A</option>
          <option value="Category B">Category B</option>
          <option value="Category C">Category C</option>
        </select>
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}{" "}
            <button data-testid={`add-to-cart-${product.id}`}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price.toFixed(2)}{" "}
            <button onClick={() => removeFromCart(item.id)} data-testid={`remove-from-cart-${item.id}`}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total Value: ${cartTotal}</p>
    </div>
  );
};

export default App;
