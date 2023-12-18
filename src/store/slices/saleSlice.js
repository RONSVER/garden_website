import { createSlice } from "@reduxjs/toolkit";
import { saleRequest } from "../../requests/saleRequest";

const saleSlice = createSlice({
  name: "sale",
  initialState: {
    status: null,
    saleList: [],
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(saleRequest.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(saleRequest.fulfilled, (state, action) => {
      state.status = "ready";
      state.saleList = action.payload;
    });
    builder.addCase(saleRequest.rejected, (state) => {
      state.status = "error";
    });
  },
});

export default saleSlice.reducer;
