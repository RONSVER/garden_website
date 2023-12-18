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
