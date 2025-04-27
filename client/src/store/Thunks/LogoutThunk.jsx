import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/AxiosInstance';

const LogoutThunk = createAsyncThunk('auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/logout');
      
      // Clear client-side storage if needed
      localStorage.removeItem('persist:root');
      
      return response.data;
    } catch (err) {
      console.error('Logout error:', err);
      return rejectWithValue(
        err.response?.data?.message || 'Failed to logout. Please try again.'
      );
    }
  }
);

export default LogoutThunk;