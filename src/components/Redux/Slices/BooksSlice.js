import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("booksData/fetchData", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch("/Data/data.json");

    if (!res.ok) {
      throw new Error("Failed to load data.json");
    } 
    const data = await res.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const booksSlice = createSlice({
  name: "booksData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default booksSlice.reducer;

