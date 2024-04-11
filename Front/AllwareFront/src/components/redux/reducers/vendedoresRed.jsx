import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const vendedoresSlice = createSlice({
  name: "vendedores",
  initialState,
  reducers: {
    addVendedores: (state, action) => {
      return [...state, ...action.payload];
    },
    resetVendedores: (state) => {
      return initialState;
    },
  },
});

export const { addVendedores, resetVendedores } = vendedoresSlice.actions;
export default vendedoresSlice.reducer;
