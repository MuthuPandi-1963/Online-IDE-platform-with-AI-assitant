import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/AxiosInstance";

const ProgrammingThunk = createAsyncThunk("code/run",
    async (formData, { rejectWithValue }) => {
        try {
            const programmingResponse = await axiosInstance.post("/code/run", formData);
            console.log(programmingResponse);
            return programmingResponse.data;  // Returns { output: "execution result" }
            
        } catch (err) {
            console.error("Error:", err);
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export default ProgrammingThunk;
