import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./Components/Authentication/Login";
import SignupPage from "./Components/Authentication/Signup";
import Navbar from "./Components/Header/NavBar";
import { useContext, useEffect } from "react";
import { AuthContext } from "./store/Context/AuthContext";
import { fetchUserData } from "./store/Thunks/GetUserThunk";

export default function App() {
  const data = useSelector(state=>state.auth)
  const {authState,authDispatch} = useContext(AuthContext)
  console.log(data);
  
  const Dispatch = useDispatch()
  useEffect(()=>{
     Dispatch(fetchUserData())
     authDispatch({type:"close"})
     
  },[Dispatch])
  return(
    <>
    <Navbar/>
    {authState.isActive && (
      authState.name == "login" ? <LoginPage/> : <SignupPage/>)}
   
    
    </>
  )
}