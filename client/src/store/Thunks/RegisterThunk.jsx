import {createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../utils/AxiosInstance';

const RegisterThunk = createAsyncThunk("register",
    async(formdata,{rejectWithValue})=>{
        try{
            const registerResponse = await axiosInstance.post("/auth/register",formdata)
            console.log(registerResponse);
            return registerResponse.data
            
        }catch(err){
            console.log(err);
            return rejectWithValue(err.message);
        }
    }
)
export default RegisterThunk;