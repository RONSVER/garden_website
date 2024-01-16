import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./slices/categoriesSlice";
import saleReucer from "./slices/saleSlice";
import cartReducer from "./slices/cartSlice";
import prodByCategoriesReducer from "./slices/prodByCategoriesSlice";
import orderReducer from "./slices/orderSlice";
import namingReducer from "./slices/namingSlice";
import filterReducer from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    sale: saleReucer,
    cart: cartReducer,
    prodBycategories: prodByCategoriesReducer,
    order: orderReducer,
    naming: namingReducer,
    filter: filterReducer,
  },
});

export default store;
