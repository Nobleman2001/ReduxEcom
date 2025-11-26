import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllBooksData = createAsyncThunk("categoryBooksData/fetchBooksData", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/Data/booksdata.json");
    if (!response.ok) {
      throw new Error("Failed to fetch the books data");
    }
    const data = response.json()
    return data
  } catch (error) {
    rejectWithValue(error.message);
  }
});

const booksDataSlice = createSlice({
  name: "categoryBooksData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBooksData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllBooksData.fulfilled, (state, action) => {
        (state.loading = false), (state.data = action.payload);
      })
      .addCase(fetchAllBooksData.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      });
  },
});
export default booksDataSlice.reducer;
