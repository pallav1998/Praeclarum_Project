"use client";

import { configureStore } from "@reduxjs/toolkit";
import { rtkApi } from "./rtkApi";

const store = configureStore({
  reducer: {
    [rtkApi.reducerPath]: rtkApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkApi.middleware),
});

export default store;
