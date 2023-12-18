import { createSlice } from "@reduxjs/toolkit";

const localStorageProduct = JSON.parse(localStorage.getItem("product")) ?? [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    list: localStorageProduct,
  },
  reducers: {
    addToCard(state, action) {
      const productCard = state.list.find(({ id }) => id === action.payload.id);

      if (!productCard) {
        state.list.push({ ...action.payload, count: 1 });
      } else {
        productCard.count++;
      }

      localStorage.setItem("product", JSON.stringify(state.list));
    },

    countPlus(state, action) {
      state.list.find((el) => el.id === action.payload).count++;
      localStorage.setItem("product", JSON.stringify(state.list));
    },

    countMinus(state, action) {
      const product = state.list.find((el) => el.id === action.payload);
      if (product.count > 1) {
        product.count--;
      } else {
        state.list = state.list.filter((el) => el.id !== action.payload);
      }

      localStorage.setItem("product", JSON.stringify(state.list));
    },

    funDelete(state, action) {
      state.list = state.list.filter((el) => el.id !== action.payload);
      localStorage.setItem("product", JSON.stringify(state.list));
    },
  },
});

export const { addToCard, countPlus, countMinus, funDelete } =
  cartSlice.actions;
export default cartSlice.reducer;
