import { configureStore } from "@reduxjs/toolkit";
import { invoiceGeneratorApi } from "../api/invoice-generator-api";

export const store = configureStore({
    reducer: {
        [invoiceGeneratorApi.reducerPath]: invoiceGeneratorApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(invoiceGeneratorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;