import cartReducer, {
      addToCart,
      removeFromCart,
      decreaseQuantity,
      clearCart,
      selectCartCount,
      selectCartTotal,
      selectCartItems,
    } from "./cartSlice";

describe("cartSlice", () => {
  it("should add a product to the cart", () => {
    const initialState = {
      cartItems: [],
    };

    const product = {
      id: 1,
      title: "Test Product",
      price: 20,
    };

    const newState = cartReducer(
      initialState,
      addToCart(product)
    );

    expect(newState.cartItems).toHaveLength(1);
    expect(newState.cartItems[0].id).toBe(1);
    expect(newState.cartItems[0].quantity).toBe(1);
  });

  it("should increase quantity when the same product is added again", () => {
      const product = {
        id: 1,
        title: "Test Product",
        price: 20,
      };
    
      const firstState = cartReducer(
        { cartItems: [] },
        addToCart(product)
      );
    
      const secondState = cartReducer(
        firstState,
        addToCart(product)
      );
    
      expect(secondState.cartItems).toHaveLength(1);
      expect(secondState.cartItems[0].quantity).toBe(2);
    });

    it("should remove a product from the cart", () => {
      const initialState = {
        cartItems: [
          { id: 1, title: "Product A", price: 20, quantity: 1 },
          { id: 2, title: "Product B", price: 30, quantity: 1 },
        ],
      };
    
      const newState = cartReducer(
        initialState,
        removeFromCart(1)
      );
    
      expect(newState.cartItems).toHaveLength(1);
      expect(newState.cartItems[0].id).toBe(2);
    });

    it("should decrease product quantity by one", () => {
      const initialState = {
        cartItems: [
          { id: 1, title: "Product A", price: 20, quantity: 3 },
        ],
      };
    
      const newState = cartReducer(
        initialState,
        decreaseQuantity(1)
      );
    
      expect(newState.cartItems[0].quantity).toBe(2);
    });

    it("should remove product when quantity reaches one", () => {
      const initialState = {
        cartItems: [
          { id: 1, title: "Product A", price: 20, quantity: 1 },
        ],
      };
    
      const newState = cartReducer(
        initialState,
        decreaseQuantity(1)
      );
    
      expect(newState.cartItems).toHaveLength(0);
    });

    it("should clear all products from the cart", () => {
      const initialState = {
        cartItems: [
          { id: 1, title: "Product A", price: 20, quantity: 2 },
          { id: 2, title: "Product B", price: 30, quantity: 1 },
        ],
      };
    
      const newState = cartReducer(
        initialState,
        clearCart()
      );
    
      expect(newState.cartItems).toHaveLength(0);
    });

    it("should calculate total cart quantity", () => {
      const state = {
        cart: {
          cartItems: [
            { id: 1, price: 20, quantity: 2 },
            { id: 2, price: 30, quantity: 1 },
          ],
        },
      };
    
      expect(selectCartCount(state)).toBe(3);
    });

    it("should calculate total cart price", () => {
      const state = {
        cart: {
          cartItems: [
            { id: 1, price: 20, quantity: 2 },
            { id: 2, price: 30, quantity: 1 },
          ],
        },
      };
    
      expect(selectCartTotal(state)).toBe(70);
    });

    it("should return cart items", () => {
      const state = {
        cart: {
          cartItems: [
            { id: 1, price: 20, quantity: 2 },
            { id: 2, price: 30, quantity: 1 },
          ],
        },
      };
    
      expect(selectCartItems(state)).toHaveLength(2);
      expect(selectCartItems(state)[0].id).toBe(1);
    });
});