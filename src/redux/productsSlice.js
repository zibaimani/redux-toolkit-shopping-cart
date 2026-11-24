import { createSlice, createAsyncThunk, createSelector  } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
      "products/fetchProducts",
      async (_, { rejectWithValue }) => {
            try{
                  const response = await fetch('https://fakestoreapi.com/products')
                  if(!response.ok){
                        return rejectWithValue("Failed to fetch products")
                  }
                  const products = await response.json();
                  return products
            } catch(error){
                  return rejectWithValue(error.message)
            }
      },
      {
            condition: (_, { getState }) => {
              const { status } = getState().products;
          
              return status === "idle" || status === "failed";
            },
          }
);
const productsSlice = createSlice({
      name: 'products',
      initialState: {
            items: [],
            status: "idle",
            error: null,
      },
      reducers: {

      },
      extraReducers: (builder) => {
            builder.addCase(fetchProducts.pending, (state) =>{
                  state.status = "loading";
                  state.error = null;
            });
            builder.addCase(fetchProducts.fulfilled, (state, action) => {
                  state.status = "succeeded";
                  state.items = action.payload;
                  state.error = null;
            });
            builder.addCase(fetchProducts.rejected, (state, action) => {
                  state.status = "failed";
                  state.error = action.payload ?? action.error.message;
            })
      }
})
// Basic selectors
export const selectProducts = (state) => state.products.items;

export const selectProductsStatus = (state) => state.products.status;

export const selectProductsError = (state) => state.products.error;

// Memoized selector
export const selectProductCount = createSelector(
  [selectProducts],
  (items) => items.length
);
export default productsSlice.reducer;