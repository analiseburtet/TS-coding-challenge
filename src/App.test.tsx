import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from './App';

describe("App", () => {
  test("renders product list", () => {
    render(<App />);
    const productListItems = screen.getAllByRole("listitem");
    expect(productListItems.length).toBe(4); 
  });

  test("filters products by category", () => {
    render(<App />);
    const categoryFilter = screen.getByLabelText("Filter by category:");

    fireEvent.change(categoryFilter, { target: { value: "Category A" } });

    const filteredProductListItems = screen.getAllByRole("listitem");
    expect(filteredProductListItems.length).toBe(2);
  });

  describe("shopping cart", () => {
    test("adds and removes products from the cart", () => {
      render(<App />);
      const product1ToAddButton = screen.getByTestId("add-to-cart-1");
      const product2ToAddButton = screen.getByTestId("add-to-cart-2");

      fireEvent.click(product1ToAddButton);
      fireEvent.click(product2ToAddButton);

      const cartItems = screen.getAllByLabelText("cart-item");
      expect(cartItems.length).toBe(2);

      const product1ToRemoveButton = screen.getByTestId("remove-from-cart-1");
      fireEvent.click(product1ToRemoveButton);

      const updatedCartItems = screen.getAllByLabelText("cart-item");
      expect(updatedCartItems.length).toBe(1);
    });

    test("updates total value correctly when a product is removed from the cart", () => {
      render(<App />);
      const product1ToAddButton = screen.getByTestId("add-to-cart-1");
      const product2ToAddButton = screen.getByTestId("add-to-cart-2");
      const product1ToRemoveButton = screen.getByTestId("remove-from-cart-1");

      fireEvent.click(product1ToAddButton);
      fireEvent.click(product2ToAddButton);

      const totalValueElementBeforeRemoval = screen.getByText("Total Value: $26.98");
      expect(totalValueElementBeforeRemoval).toBeInTheDocument();

      fireEvent.click(product1ToRemoveButton);

      const totalValueElementAfterRemoval = screen.getByText("Total Value: $15.99");
      expect(totalValueElementAfterRemoval).toBeInTheDocument();
    });
  });
});
