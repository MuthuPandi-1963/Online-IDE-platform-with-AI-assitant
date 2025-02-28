import {createAsyncThunk} from '@reduxjs/toolkit'
import axiosInstance from '../../utils/AxiosInstance';

const LoginThunk = createAsyncThunk("login",
    async(formdata,{rejectWithValue})=>{
        try{
            const loginResponse = await axiosInstance.post("/auth/login",formdata)
            console.log(loginResponse);
            return loginResponse.data
            
        }catch(err){
            console.log(err);
            return rejectWithValue(error.message);
        }
    }
)
export default LoginThunk;