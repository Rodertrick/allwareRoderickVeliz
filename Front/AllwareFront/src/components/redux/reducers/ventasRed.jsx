import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ventasSlice = createSlice({
  name: "ventas",
  initialState,
  reducers: {
    addVentas: (state, action) => {
      return [...state, ...action.payload];
    },
    resetVentas: (state) => {
      return initialState;
    },
    deleteVenta: (state, action) => {
      return state.filter((venta) => venta.rut !== action.payload);
    },
  },
});

export const { addVentas, resetVentas, deleteVenta } = ventasSlice.actions;
export default ventasSlice.reducer;
