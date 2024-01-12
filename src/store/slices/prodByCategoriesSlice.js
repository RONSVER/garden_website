import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const prodByCategoriesRequest = createAsyncThunk(
  "prodByCategories/prodByCategoriesRequest",
  async (id) => {
    try {
      const response = await fetch(`http://localhost:3333/categories/${id}`);
      const data = await response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const prodByCategoriesSlice = createSlice({
  name: "prodByCategories",
  initialState: {
    list: {
      data: [],
      modedData: [],
    },
    status: null,
    isChecked: false,
    sortBy: "by default",
    filterPrice: {
      minPrice: 0,
      maxPrice: 0,
    },
  },

  reducers: {
    includesCheked(state) {
      state.isChecked = !state.isChecked;

      if (state.isChecked) {
        state.list.data.data = state.list.data.data.filter(
          (el) => el.discont_price
        );
      } else {
        state.list.data.data = state.list.modedData.data;
      }
    },

    includesSort(state, action) {
      state.sortBy = action.payload;

      if (state.sortBy === "priceLowToHigh") {
        state.list.data.data.sort((a, b) => a.price - b.price);
      } else if (state.sortBy === "priceHighToLow") {
        state.list.data.data.sort((a, b) => b.price - a.price);
      } else if (state.isChecked && state.sortBy === "default") {
        state.list.data.data = state.list.modedData.data.filter(
          (el) => el.discont_price
        );
      } else if (state.isChecked) {
        state.list.data.data = state.list.data.data.filter(
          (el) => el.discont_price
        );
      } else {
        state.list.data.data = state.list.modedData.data;
      }
    },

    setMinPrice(state, action) {
      state.filterPrice.minPrice = parseFloat(action.payload);

      state.list.data.data = state.list.modedData.data.filter(
        (el) =>
          !state.filterPrice.minPrice ||
          parseFloat(el.discont_price || el.price) >= state.filterPrice.minPrice
      );
    },

    setMaxPrice(state, action) {
      state.filterPrice.maxPrice = parseFloat(action.payload);

      state.list.data.data = state.list.modedData.data.filter(
        (el) =>
          !state.filterPrice.maxPrice ||
          parseFloat(el.discont_price || el.price) <= state.filterPrice.maxPrice
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(prodByCategoriesRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(prodByCategoriesRequest.fulfilled, (state, action) => {
        state.status = "ready!";
        state.list.data = action.payload;
        state.list.modedData = action.payload;
      })
      .addCase(prodByCategoriesRequest.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const { includesCheked, includesSort, setMinPrice, setMaxPrice } =
  prodByCategoriesSlice.actions;

export default prodByCategoriesSlice.reducer;
