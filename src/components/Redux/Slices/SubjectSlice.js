import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubjectData = createAsyncThunk("subjectsData/fetchSubjectsData", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/Data/subject.json");
    if (!response.ok) {
      throw new Error("Failed to fetch subjects data");
    }
    const data = response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
const subjectSlice = createSlice({
  name: "subjectsData",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSubjectData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubjectData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSubjectData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default subjectSlice.reducer;
