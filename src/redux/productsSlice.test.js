import productsReducer, {
  fetchProducts,
  selectProductCount,
  selectProducts,
  selectProductsStatus,
  selectProductsError,
} from "./productsSlice";
import { configureStore } from "@reduxjs/toolkit";

describe("productsSlice", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should store products when fetching succeeds", () => {
    const initialState = {
      items: [],
      status: "idle",
      error: null,
    };

    const mockProducts = [
      { id: 1, title: "Product A", price: 20 },
      { id: 2, title: "Product B", price: 30 },
    ];

    const newState = productsReducer(
      initialState,
      fetchProducts.fulfilled(mockProducts)
    );

    expect(newState.status).toBe("succeeded");
    expect(newState.items).toEqual(mockProducts);
    expect(newState.error).toBe(null);
  });

  it("should handle fetch products failure", () => {
    const initialState = {
      items: [],
      status: "loading",
      error: null,
    };

    const errorMessage = "Failed to fetch products";

    const newState = productsReducer(
      initialState,
      fetchProducts.rejected(
        new Error(errorMessage),
        "request-id",
        undefined,
        errorMessage
      )
    );

    expect(newState.status).toBe("failed");
    expect(newState.error).toBe(errorMessage);
  });

  it("should set loading status when fetching starts", () => {
    const initialState = {
      items: [],
      status: "idle",
      error: "Previous error",
    };

    const newState = productsReducer(
      initialState,
      fetchProducts.pending("request-id")
    );

    expect(newState.status).toBe("loading");
    expect(newState.error).toBe(null);
  });

  it("should return total number of products", () => {
    const state = {
      products: {
        items: [
          { id: 1, title: "Product A" },
          { id: 2, title: "Product B" },
          { id: 3, title: "Product C" },
        ],
        status: "succeeded",
        error: null,
      },
    };

    expect(selectProductCount(state)).toBe(3);
  });

  it("should return products list", () => {
    const state = {
      products: {
        items: [
          { id: 1, title: "Product A" },
          { id: 2, title: "Product B" },
        ],
        status: "succeeded",
        error: null,
      },
    };

    expect(selectProducts(state)).toHaveLength(2);
  });

  it("should return products status", () => {
    const state = {
      products: {
        items: [],
        status: "loading",
        error: null,
      },
    };

    expect(selectProductsStatus(state)).toBe("loading");
  });

  it("should return products error", () => {
    const state = {
      products: {
        items: [],
        status: "failed",
        error: "Network Error",
      },
    };

    expect(selectProductsError(state)).toBe("Network Error");
  });

  it("should fetch products successfully", async () => {
    const mockProducts = [
      { id: 1, title: "Product A", price: 20 },
      { id: 2, title: "Product B", price: 30 },
    ];

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockProducts,
      })
    );

    const store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });

    const result = await store.dispatch(fetchProducts());

    expect(result.type).toBe(fetchProducts.fulfilled.type);
    expect(store.getState().products.items).toEqual(mockProducts);
    expect(store.getState().products.status).toBe("succeeded");
  });

  it("should handle API response error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
      })
    );

    const store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });

    const result = await store.dispatch(fetchProducts());

    expect(result.type).toBe(fetchProducts.rejected.type);
    expect(result.payload).toBe("Failed to fetch products");
    expect(store.getState().products.status).toBe("failed");
    expect(store.getState().products.error).toBe("Failed to fetch products");
  });

  it("should handle network error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValue(new Error("Network Error"))
    );

    const store = configureStore({
      reducer: {
        products: productsReducer,
      },
    });

    const result = await store.dispatch(fetchProducts());

    expect(result.type).toBe(fetchProducts.rejected.type);
    expect(result.payload).toBe("Network Error");
    expect(store.getState().products.status).toBe("failed");
    expect(store.getState().products.error).toBe("Network Error");
  });

  it("should prevent duplicate API requests while loading", async () => {
      const fetchMock = vi.fn();
    
      vi.stubGlobal("fetch", fetchMock);
    
      const store = configureStore({
        reducer: {
          products: productsReducer,
        },
        preloadedState: {
          products: {
            items: [],
            status: "loading",
            error: null,
          },
        },
      });
    
      const result = await store.dispatch(fetchProducts());
    
      expect(result.meta.condition).toBe(true);
      expect(fetchMock).not.toHaveBeenCalled();
      expect(store.getState().products.status).toBe("loading");
    });
});
