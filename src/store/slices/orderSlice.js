import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const orderRequest = createAsyncThunk(
  "order/orderRequest",
  async (id) => {
    try {
      const response = await fetch(`http://localhost:3333/products/${id}`);
      const data = response.json();

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    list: [],
    status: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(orderRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(orderRequest.fulfilled, (state, action) => {
        state.status = "ready!";
        state.list = action.payload;
      })
      .addCase(orderRequest.rejected, (state) => {
        state.status = "error";
      });
  },
});

export default orderSlice.reducer;
