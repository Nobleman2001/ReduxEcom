import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../Slices/BooksSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
});
