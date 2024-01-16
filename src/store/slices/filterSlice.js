import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const filterRequest = createAsyncThunk(
  "filter/filterRequest",
  async (url) => {
    try {
      const response = await fetch(url);
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

const filterSlice = createSlice({
  name: "filter",
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
    includesChekedFilter(state) {
      state.isChecked = !state.isChecked;
      state.list.data = filterByPrice(
        state.list.modedData,
        state.filterPrice.minPrice,
        state.filterPrice.maxPrice,
        state.isChecked
      );
    },

    includesSortFilter(state, action) {
      state.sortBy = action.payload;

      if (state.list.data) {
        if (state.sortBy === "priceLowToHigh") {
          state.list.data.sort((a, b) => a.price - b.price);
        } else if (state.sortBy === "priceHighToLow") {
          state.list.data.sort((a, b) => b.price - a.price);
        } else {
          state.list.data.sort((a, b) => a.id - b.id);
        }
      }
    },

    setMinPriceFilter(state, action) {
      state.filterPrice.minPrice = parseFloat(action.payload);
      state.list.data = filterByPrice(
        state.list.modedData,
        state.filterPrice.minPrice,
        state.filterPrice.maxPrice,
        state.isChecked
      );
    },

    setMaxPriceFilter(state, action) {
      state.filterPrice.maxPrice = parseFloat(action.payload);
      state.list.data = filterByPrice(
        state.list.modedData,
        state.filterPrice.minPrice,
        state.filterPrice.maxPrice,
        state.isChecked
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(filterRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(filterRequest.fulfilled, (state, action) => {
        state.status = "ready!";
        state.list.data = action.payload;
        state.list.modedData = action.payload;
      })
      .addCase(filterRequest.rejected, (state) => {
        state.status = "error";
      });
  },
});

export const {
  includesChekedFilter,
  includesSortFilter,
  setMinPriceFilter,
  setMaxPriceFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
