import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/allReducers";
import vendedoresSlice from "./reducers/vendedoresRed";
import automovilesSlice from "./reducers/automovilesRed";
import ventasSlice from "./reducers/ventasRed";

const store = configureStore({
  reducer: {
    root: rootReducer,
    vendedores: vendedoresSlice,
    automoviles: automovilesSlice,
    ventas: ventasSlice,
  },
});

export default store;
