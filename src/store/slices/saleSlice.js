import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saleRequest = createAsyncThunk("sale/saleRequest", async () => {
  try {
    const response = await fetch("http://localhost:3333/products/all");
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Ошибка запроса:", error.message);
    throw error;
  }
});

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
