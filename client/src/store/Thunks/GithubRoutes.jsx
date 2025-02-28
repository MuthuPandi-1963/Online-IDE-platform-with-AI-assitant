// store/Thunks/githubLoginThunk.js
import { createAsyncThunk } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import axios from "axios";
import axiosInstance from "../../utils/AxiosInstance";

const GitHubLoginThunk = createAsyncThunk(
  "githubLogin",
  async (githubToken, { rejectWithValue }) => {
    try {
      // Send the GitHub token to the backend for verification
      const response = await axiosInstance.get("/auth/github", { params: { token: githubToken } }, { withCredentials: true });
      
      // If successful, show a success toast
      toast.success(response.data.message);
      return response.data; // Return the response data (user data, success message)
    } catch (err) {
      // Improved error handling with toast notifications
      console.error("GitHub login error:", err.response || err.message || err);
      toast.error(err.response?.data?.message || "GitHub login failed", {
        className: "toast-error",
      });
      return rejectWithValue(err.response?.data?.message || err.message || "An unknown error occurred");
    }
  }
);

export default GitHubLoginThunk;
