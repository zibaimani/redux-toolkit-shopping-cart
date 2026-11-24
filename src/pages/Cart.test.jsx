import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import Cart from "./Cart";
import cartReducer from "../redux/cartSlice";

describe("Cart component", () => {
  it("should display empty cart message", () => {
    const store = configureStore({
      reducer: {
        cart: cartReducer,
      },
      preloadedState: {
        cart: {
          cartItems: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByRole("heading", { name: "Cart is Empty" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: "Products" })
    ).toBeInTheDocument();
  });
  it("should display cart items and calculate total price", () => {
      const mockCartItems = [
        {
          id: 1,
          title: "Product A",
          price: 20,
          description: "Test description",
          image: "test-image.jpg",
          quantity: 2,
        },
        {
          id: 2,
          title: "Product B",
          price: 30,
          description: "Another description",
          image: "test-image-2.jpg",
          quantity: 1,
        },
      ];
    
      const store = configureStore({
        reducer: {
          cart: cartReducer,
        },
        preloadedState: {
          cart: {
            cartItems: mockCartItems,
          },
        },
      });
    
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Cart />
          </MemoryRouter>
        </Provider>
      );
    
      expect(screen.getByText("Product A")).toBeInTheDocument();
      expect(screen.getByText("Product B")).toBeInTheDocument();
    
      expect(screen.getByText("Total: 70.00")).toBeInTheDocument();
    
      expect(screen.getByText("40")).toBeInTheDocument();
      expect(screen.getAllByText("30")).toHaveLength(2);
    });

    it("should increase product quantity and update total price", () => {
      const mockCartItems = [
        {
          id: 1,
          title: "Product A",
          price: 20,
          description: "Test description",
          image: "test-image.jpg",
          quantity: 2,
        },
      ];
    
      const store = configureStore({
        reducer: {
          cart: cartReducer,
        },
        preloadedState: {
          cart: {
            cartItems: mockCartItems,
          },
        },
      });
    
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Cart />
          </MemoryRouter>
        </Provider>
      );
    
      fireEvent.click(screen.getByRole("button", { name: "+" }));
    
      expect(store.getState().cart.cartItems[0].quantity).toBe(3);
      expect(screen.getByText("60")).toBeInTheDocument();
      expect(screen.getByText("Total: 60.00")).toBeInTheDocument();
    });
    it("should decrease product quantity and update total price", () => {
      const mockCartItems = [
        {
          id: 1,
          title: "Product A",
          price: 20,
          description: "Test description",
          image: "test-image.jpg",
          quantity: 2,
        },
      ];
    
      const store = configureStore({
        reducer: {
          cart: cartReducer,
        },
        preloadedState: {
          cart: {
            cartItems: mockCartItems,
          },
        },
      });
    
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Cart />
          </MemoryRouter>
        </Provider>
      );
    
      fireEvent.click(screen.getByRole("button", { name: "-" }));
    
      expect(store.getState().cart.cartItems[0].quantity).toBe(1);
      expect(screen.getAllByText("20")).toHaveLength(2);
      expect(screen.getByText("Total: 20.00")).toBeInTheDocument();
    });

    it("should remove product from cart", () => {
      const mockCartItems = [
        {
          id: 1,
          title: "Product A",
          price: 20,
          description: "Test description",
          image: "test-image.jpg",
          quantity: 2,
        },
        {
          id: 2,
          title: "Product B",
          price: 30,
          description: "Another description",
          image: "test-image-2.jpg",
          quantity: 1,
        },
      ];
    
      const store = configureStore({
        reducer: {
          cart: cartReducer,
        },
        preloadedState: {
          cart: {
            cartItems: mockCartItems,
          },
        },
      });
    
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Cart />
          </MemoryRouter>
        </Provider>
      );
    
      fireEvent.click(
        screen.getAllByRole("button", { name: "Delete" })[0]
      );
    
      expect(store.getState().cart.cartItems).toHaveLength(1);
      expect(store.getState().cart.cartItems[0].title).toBe("Product B");
      expect(screen.queryByText("Product A")).not.toBeInTheDocument();
      expect(screen.getByText("Total: 30.00")).toBeInTheDocument();
    });

    it("should clear all cart items", () => {
      const mockCartItems = [
        {
          id: 1,
          title: "Product A",
          price: 20,
          description: "Test description",
          image: "test-image.jpg",
          quantity: 2,
        },
        {
          id: 2,
          title: "Product B",
          price: 30,
          description: "Another description",
          image: "test-image-2.jpg",
          quantity: 1,
        },
      ];
    
      const store = configureStore({
        reducer: {
          cart: cartReducer,
        },
        preloadedState: {
          cart: {
            cartItems: mockCartItems,
          },
        },
      });
    
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Cart />
          </MemoryRouter>
        </Provider>
      );
    
      fireEvent.click(
        screen.getByRole("button", { name: "Clear Cart" })
      );
    
      expect(store.getState().cart.cartItems).toHaveLength(0);
    
      expect(
        screen.getByRole("heading", { name: "Cart is Empty" })
      ).toBeInTheDocument();
    });
});