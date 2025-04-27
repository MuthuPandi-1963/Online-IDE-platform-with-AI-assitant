import { createSlice } from "@reduxjs/toolkit";
import AiCodeThunk from "../Thunks/AI_CodeThunk";

const initialState = {
  data: {},
  success: true,
  message: "",
  isLoading: false,
};

const handleSuccess = (state, action) => {
  state.isLoading = false;
  state.data = action.payload?.data || {};
  state.success = action.payload?.success ?? true;
  state.message = action.payload?.message || "Success";
};

const handleError = (state, action) => {
  state.isLoading = false;
  state.success = false;
  state.message = action.error?.message || "An error occurred";
};

const AICodeSlice = createSlice({
  name: "aicode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AiCodeThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(AiCodeThunk.fulfilled, handleSuccess)
      .addCase(AiCodeThunk.rejected, handleError);
  },
});

export default AICodeSlice.reducer;
