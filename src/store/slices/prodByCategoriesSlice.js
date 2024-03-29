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

function filterByPrice(data, minPrice, maxPrice, isChecked) {
  return data.filter((el) => {
    const price = parseFloat(el.discont_price || el.price);
    return (
      (!minPrice || price >= minPrice) &&
      (!maxPrice || price <= maxPrice) &&
      (!isChecked || el.discont_price)
    );
  });
}

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
      state.list.data.data = filterByPrice(
        state.list.modedData.data,
        state.filterPrice.minPrice,
        state.filterPrice.maxPrice,
        state.isChecked
      );
    },

    includesSort(state, action) {
      state.sortBy = action.payload;

      if (state.list.data.data) {
        if (state.sortBy === "priceLowToHigh") {
          state.list.data.data.sort((a, b) => a.price - b.price);
        } else if (state.sortBy === "priceHighToLow") {
          state.list.data.data.sort((a, b) => b.price - a.price);
        } else {
          state.list.data.data.sort((a, b) => a.id - b.id);
        }
      }
    },

    setMinPrice(state, action) {
      state.filterPrice.minPrice = parseFloat(action.payload);
      state.list.data.data = filterByPrice(
        state.list.modedData.data,
        state.filterPrice.minPrice,
        state.filterPrice.maxPrice,
        state.isChecked
      );
    },

    setMaxPrice(state, action) {
      state.filterPrice.maxPrice = parseFloat(action.payload);
      state.list.data.data = filterByPrice(
        state.list.modedData.data,
        state.filterPrice.minPrice,
        state.filterPrice.maxPrice,
        state.isChecked
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
