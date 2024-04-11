import { combineReducers } from "redux";
import vendedoresSlice from "./vendedoresRed";
import automovilesSlice from "./automovilesRed";
import ventasSlice from "./ventasRed";

const rootReducer = combineReducers({
  vendedoresSlice,
  automovilesSlice,
  ventasSlice,
});

export default rootReducer;
