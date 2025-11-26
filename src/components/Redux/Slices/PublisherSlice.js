import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPublishersData = createAsyncThunk(
  "publisherData/fetchPublisherData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("/Data/publisher.json");
      if (!res.ok) {
        throw new Error("Failed to load publisher data");
      }
      const data = res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const publisherSlice = createSlice({
  name: "publisherData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchPublishersData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublishersData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPublishersData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default publisherSlice.reducer
