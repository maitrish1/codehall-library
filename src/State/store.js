import { configureStore } from "@reduxjs/toolkit";
import allBooksSlice from "./bookSlices/allBooksSlice";
export const store = configureStore({
  reducer: {
    allBooks: allBooksSlice,
  },
});
