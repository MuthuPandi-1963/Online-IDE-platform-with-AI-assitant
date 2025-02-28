import {createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../utils/AxiosInstance';
import axios from 'axios';
export const fetchUserData = createAsyncThunk("auth/refreshAuth", async (_, { rejectWithValue }) => {
  try {
      const response = await axios.get(`http://localhost:3000/auth/refreshAuth`, {
          withCredentials: true,  // ✅ Ensures cookies are sent
      });
      console.log(response);
      
      return response.data;
  } catch (error) {
      console.error("Error fetching user:", error.response?.data || error.message);
      return rejectWithValue("Failed to fetch user");
  }
});

  