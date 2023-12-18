import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import saleReucer from "./slices/saleSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    sale: saleReucer,
    cart: cartReducer,
  },
});

export default store;
