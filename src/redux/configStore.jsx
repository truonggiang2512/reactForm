import { configureStore } from "@reduxjs/toolkit";
import QuanLySvReducer from "./reducers/QuanLySvReducer";

export const store = configureStore({
  reducer: {
    QuanLySvReducer: QuanLySvReducer,
  },
});
