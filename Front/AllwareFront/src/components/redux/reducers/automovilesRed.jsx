import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const automovilesSlice = createSlice({
  name: "automoviles",
  initialState,
  reducers: {
    addAutomoviles: (state, action) => {
      return [...state, ...action.payload];
    },
    resetAutomoviles: (state) => {
      return initialState;
    },
  },
});

export const { addAutomoviles, resetAutomoviles } = automovilesSlice.actions;
export default automovilesSlice.reducer;
