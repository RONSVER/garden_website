import { createSlice } from "@reduxjs/toolkit";

const localStorageNamingOne = localStorage.getItem("nameOne") ?? null;
const localStorageNamingTwo = localStorage.getItem("nameTwo") ?? null;

const namingSlice = createSlice({
  name: "namingSlice",
  initialState: {
    nameOne: localStorageNamingOne,
    nameTwo: localStorageNamingTwo,
  },
  reducers: {
    setNames: (state, action) => {
      const { nameOne, nameTwo } = action.payload;
      state.nameOne = nameOne;
      state.nameTwo = nameTwo;
      localStorage.setItem("nameOne", nameOne);
      localStorage.setItem("nameTwo", nameTwo);
    },
  },
});

export const { setNames } = namingSlice.actions;
export default namingSlice.reducer;
