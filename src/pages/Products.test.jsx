import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import Products from "./Products";
import productsReducer from "../redux/productsSlice";
import cartReducer from "../redux/cartSlice";
import { afterEach } from "vitest";

describe("Products component", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });
  it("should show loader while products are loading", () => {
    const store = configureStore({
      reducer: {
        products: productsReducer,
        cart: cartReducer,
      },
      preloadedState: {
        products: {
          items: [],
          status: "loading",
          error: null,
        },
        cart: {
          cartItems: [],
        },
      },
    });

    const { container } = render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    expect(container.querySelector(".loader")).toBeInTheDocument();
  });

  it("should display products and add product to cart", () => {
    const mockProducts = [
      {
        id: 1,
        title: "Product A",
        price: 20,
        description: "Test description",
        image: "test-image.jpg",
      },
      {
        id: 2,
        title: "Product B",
        price: 30,
        description: "Another description",
        image: "test-image-2.jpg",
      },
    ];

    const store = configureStore({
      reducer: {
        products: productsReducer,
        cart: cartReducer,
      },
      preloadedState: {
        products: {
          items: mockProducts,
          status: "succeeded",
          error: null,
        },
        cart: {
          cartItems: [],
        },
      },
    });

    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    expect(screen.getByText("Total Products: 2")).toBeInTheDocument();
    expect(screen.getByText("Product A")).toBeInTheDocument();
    expect(screen.getByText("Product B")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "Add to Cart" })[0]);

    expect(store.getState().cart.cartItems).toHaveLength(1);
    expect(store.getState().cart.cartItems[0].title).toBe("Product A");
    expect(store.getState().cart.cartItems[0].quantity).toBe(1);
  });

  it("should show error message and retry fetching products", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
    });

    vi.stubGlobal("fetch", fetchMock);

    const store = configureStore({
      reducer: {
        products: productsReducer,
        cart: cartReducer,
      },
    });

    render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    expect(
      await screen.findByText("Failed to fetch products")
    ).toBeInTheDocument();

    const retryButton = screen.getByRole("button", {
      name: "Try Again",
    });

    fireEvent.click(retryButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    await waitFor(() => {
      expect(store.getState().products.status).toBe("failed");
    });
  });
});
