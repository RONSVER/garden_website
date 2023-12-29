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
    list: [],
    status: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(prodByCategoriesRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(prodByCategoriesRequest.fulfilled, (state, action) => {
        state.status = "ready!";
        state.list = action.payload;
      })
      .addCase(prodByCategoriesRequest.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default prodByCategoriesSlice.reducer;
