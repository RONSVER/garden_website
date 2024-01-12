import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import saleReucer from "./slices/saleSlice";
import cartReducer from "./slices/cartSlice";
import prodByCategoriesReducer from "./slices/prodByCategoriesSlice";
import orderSlice from "./slices/orderSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    sale: saleReucer,
    cart: cartReducer,
    prodBycategories: prodByCategoriesReducer,
    order: orderSlice,
  },
});

export default store;
