import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "../../requests/categoriesRequest";

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
