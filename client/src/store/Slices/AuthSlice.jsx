import { createSlice } from "@reduxjs/toolkit";
import LoginThunk from "../Thunks/LoginThunk";
import RegisterThunk from "../Thunks/RegisterThunk";
import GoogleLoginThunk from "../Thunks/GoogleThunk";
import GitHubLoginThunk from "../Thunks/GithubRoutes";
import { fetchUserData } from "../Thunks/GetUserThunk";


const initialState = {
    user : {},
    isLoading : false ,
    isAuthenticated : false,
    success : false ,
    error : false,
    message : false
}

const HandleFulfilled = (state,action)=>{
    const {success , message , data} =action.payload
    state.isLoading = false
    state.isAuthenticated = true,
    state.success = success 
    state.message = message,
    state.user = data || {}
    state.error = false
}
const HandleRejected = (state, action) => {
    console.log("Rejected Payload:", action);
    const { success, message, data } = action.payload || {};
    state.isLoading = false; // Explicitly set isLoading to false
    state.error = true;
    state.success = success || false;
    state.isAuthenticated = data?.isVerified || false;
    state.message = message || "An error occurred";
    state.user = data || {};
  };
  
const AuthReducer = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser: (state,action)=>{}
    },
    extraReducers:(builder)=>{
        builder
        .addCase(LoginThunk.pending,(state,action)=>{
            state.isLoading =true
        })
        .addCase(LoginThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(LoginThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(RegisterThunk.pending,(state,action)=>{
            state.isLoading =true
        })
        .addCase(RegisterThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(RegisterThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(GoogleLoginThunk.pending,(state,action)=>{
            state.isLoading =true
        })
        .addCase(GoogleLoginThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(GoogleLoginThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(GitHubLoginThunk.pending,(state,action)=>{
            state.isLoading =true
        })
        .addCase(GitHubLoginThunk.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(GitHubLoginThunk.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
        .addCase(fetchUserData.pending,(state,action)=>{
            state.isLoading =true
        })
        .addCase(fetchUserData.fulfilled,(state,action)=>{
            HandleFulfilled(state,action)
        })
        .addCase(fetchUserData.rejected,(state,action)=>{
            HandleRejected(state,action)
        })
    }
})

export default AuthReducer.reducer;
export const {setUser} = AuthReducer.actions;