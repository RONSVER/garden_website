import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    try {
      const response = await fetch("http://localhost:3333/categories/all");
      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Ошибка запроса:", error.message);
      throw error;
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    status: null,
    categoriesList: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.status = "ready";
        state.categoriesList = action.payload;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.status = "error =(";
      });
  },
});

export default categoriesSlice.reducer;
