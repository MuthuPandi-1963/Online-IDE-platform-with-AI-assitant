import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";

import LoginPage from "./Components/Authentication/Login";
import SignupPage from "./Components/Authentication/Signup";
import Navbar from "./Components/Header/NavBar";
import Home from "./Components/Header/Home";
import CodeEditor from "./Components/Code/CodeEditor";
import WelcomePage from "./Components/Code/Hero";
import Programming from "./Components/Code/Programming";
import Chatbot from "./Components/Code/AICode";
import ApiResponseViewer from "./store/Thunks/AiData";
import Documentation from "./Components/Code/Doc";
import About from "./Components/Code/About";

import { AuthContext } from "./store/Context/AuthContext";
import { fetchUserData } from "./store/Thunks/GetUserThunk";

export default function App() {
  const data = useSelector((state) => state.auth);
  const { authDispatch } = useContext(AuthContext);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
    authDispatch({ type: "close" });
  }, [dispatch, authDispatch]);

  const isAuthenticated = data?.isAuthenticated;

  // Protected route wrapper
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />}>
          {/* Public Routes */}
          <Route path="login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" />} />

          {/* Common/Default */}
          <Route index element={<WelcomePage />} />
          <Route path="about" element={<About />} />
          <Route path="docs" element={<Documentation />} />

          {/* Protected Routes */}
          <Route
            path="code_generator"
            element={
              <PrivateRoute>
                <Chatbot />
              </PrivateRoute>
            }
          />
          <Route
            path="programming"
            element={
              <PrivateRoute>
                <Programming />
              </PrivateRoute>
            }
          />
          <Route
            path="codeEditor"
            element={
              <PrivateRoute>
                <CodeEditor />
              </PrivateRoute>
            }
          />
          <Route
            path="r"
            element={
              <PrivateRoute>
                <ApiResponseViewer />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
