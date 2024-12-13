import { configureStore } from "@reduxjs/toolkit";
import { candleApi } from "../api/chartsApi/candleApi";
import { lineApi } from "../api/chartsApi/lineApi";
import { usersApi } from "../api/userApi/userApi";
import { calculatorApi } from "../api/calculatroApi/CalculatroApi.js";
import instrumentSlice from "../store/slices/chartInstrument.js"
import userSliceReducer from "../store/slices/usersSlice.js"
import calcSliceReducer from "../store/slices/calcSlice.js"

export const store = configureStore({
  reducer: {
    [candleApi.reducerPath]: candleApi.reducer,
    [lineApi.reducerPath]: lineApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [calculatorApi.reducerPath]:calculatorApi.reducer,
    instrumentSlice:instrumentSlice,
    userSlice:userSliceReducer,
    calcSlice:calcSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      candleApi.middleware,
      lineApi.middleware,
      usersApi.middleware,
      calculatorApi.middleware,
      
    ),
});
