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
