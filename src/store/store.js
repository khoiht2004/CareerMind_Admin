import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@/store/slice/apiSlice";
import authReducer from "@/store/slice/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
