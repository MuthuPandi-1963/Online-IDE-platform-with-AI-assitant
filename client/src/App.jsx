import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./Components/Authentication/Login";
import SignupPage from "./Components/Authentication/Signup";
import Navbar from "./Components/Header/NavBar";
import { useContext, useEffect } from "react";
import { AuthContext } from "./store/Context/AuthContext";
import { fetchUserData } from "./store/Thunks/GetUserThunk";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Header/Home";
import CodeEditor from "./Components/Code/CodeEditor";
import WelcomePage from "./Components/Code/Hero";
import Programming from "./Components/Code/Programming";
import React from "./Components/Code/React";
import Share from "./Components/Code/Share";
import Chatbot from "./Components/Code/AICode";
import ApiResponseViewer from "./store/Thunks/AiData";
import Documentation from "./Components/Code/Doc";
import About from "./Components/Code/About";
// import Documentation from "./Components/Code/Doc.jsx";

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
    <Routes>
      <Route path={""} element = {<Home/>}>
      {!data?.user?.isAuthenticated ? <Route path={"/login"} element = {<LoginPage/>}/> : <Route path={""} element = {<WelcomePage/>}/>}
      {!data?.user?.isAuthenticated ? <Route path={"/signup"} element = {<SignupPage/>}/> : <Route path={""} element = {<WelcomePage/>}/>}
      
      
      <Route path={""} element = {<WelcomePage/>}/>
      <Route path={"/r"} element = {<ApiResponseViewer/>}/>
      <Route path={"/codeEditor"} element = {<CodeEditor/>}/>
      <Route path={"/programming"} element = {<Programming/>}/>
      <Route path={"/code_generator"} element = {<Chatbot/>}/>
      <Route path={"/docs"} element = {<Documentation/>}/>
      <Route path={"/about"} element = {<About/>}/>
      {/* <Route path={"/react"} element = {<React/>}/>
      <Route path={"/share"} element = {<Share/>}/> */}
      </Route>
    </Routes>
    
    </>
  )
}