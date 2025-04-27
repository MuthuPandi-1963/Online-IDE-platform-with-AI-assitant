import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";

const AiCodeThunk = createAsyncThunk(
  "code/ai_helper",
  async (formData, { rejectWithValue }) => {
    try {
      const AIResponse = await axiosInstance.post("/code/ai_helper", formData);
      console.log("AI Response:", AIResponse.data);
      return AIResponse.data; // Expected structure: { output: "execution result" }
    } catch (err) {
      console.error("API Error:", err?.response?.data || err.message);
      return rejectWithValue({
        success: false,
        message: err?.response?.data?.message || "An error occurred",
        details: err?.response?.data || null,
      });
    }
  }
);

export default AiCodeThunk;
