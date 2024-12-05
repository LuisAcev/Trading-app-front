import { configureStore } from "@reduxjs/toolkit";
import { candleApi } from "../api/chartsApi/candleApi";
import { lineApi } from "../api/chartsApi/lineApi";
import { usersApi } from "../api/userApi/userApi";

export const store = configureStore({
  reducer: {
    [candleApi.reducerPath]: candleApi.reducer,
    [lineApi.reducerPath]: lineApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      candleApi.middleware,
      lineApi.middleware,
      usersApi.middleware
    ),
});
