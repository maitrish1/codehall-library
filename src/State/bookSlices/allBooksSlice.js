import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  books: [],
};

const fetchBooksFunc = async (searchQuery) => {
  const res = await fetch(
    `https://openlibrary.org/search.json?q=${searchQuery}`,
  );
  const data = await res.json();
  return data.docs;
};

export const fetchBooksThunk = createAsyncThunk("FetchAll", fetchBooksFunc);

const booksSlice = createSlice({
  name: "allbooks",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBooksThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBooksThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.books = action.payload;
    });
    builder.addCase(fetchBooksThunk.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default booksSlice.reducer;
