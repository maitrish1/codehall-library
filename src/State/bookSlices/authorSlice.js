import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: false,
  author: [],
};

const fetchAuthorFunc = async (searchQuery) => {
  const res = await fetch(
    `https://openlibrary.org/authors/${searchQuery}.json`,
  );
  const data = await res.json();
  return data;
};

export const fetchAuthorThunk = createAsyncThunk("FetchAuthor", fetchAuthorFunc);

const authorSlice = createSlice({
  name: "allbooks",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAuthorThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAuthorThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.author = action.payload;
    });
    builder.addCase(fetchAuthorThunk.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default authorSlice.reducer;
