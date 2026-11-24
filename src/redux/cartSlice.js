import { createSlice, createSelector  } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => action.payload !== item.id
      );
    },
    increaseQuantity(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity(state, action) {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload
          );
        }
      }
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});
// Basic selector
export const selectCartItems = (state) => state.cart.cartItems;

// Memoized selector: Total quantity
export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((total, item) => total + item.quantity, 0)
);

// Memoized selector: Total price
export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
);
export default cartSlice.reducer;
export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
