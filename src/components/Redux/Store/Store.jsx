import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../Slices/BooksSlice";
import publisherReducer from "../Slices/PublisherSlice";
import subjectReducer from "../Slices/SubjectSlice";
import booksDataReducer from "../Slices/BooksDataSlice"

export const store = configureStore({
  reducer: {
    books: booksReducer,
    publishers: publisherReducer,
    subjects: subjectReducer,
    booksData:booksDataReducer
  },
});
