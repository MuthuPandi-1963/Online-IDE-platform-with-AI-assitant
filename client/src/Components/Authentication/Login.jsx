import { useContext, useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { AuthContext } from '../../store/Context/AuthContext';
import LoginThunk from '../../store/Thunks/LoginThunk';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const formData = {
    email :"",
    password :""
  }
export default function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const {authDispatch} = useContext(AuthContext)
      const [RegisterData,setRegisterData]  = useState(formData) 
      const  dispatch = useDispatch()
  

  async function HandleGoogleLogin(){
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
    authDispatch({type:"close"})

}
async function HandleGithubLogin(){
  const value = window.open(`${import.meta.env.VITE_BACKEND_URL}/oauth/github/callback`, '_self');
  authDispatch({type:"close"})

}
const HandleChange = (e)=>{
      const {name,value} = e.target
      setRegisterData((prev)=>({...prev,[name]:value}))
    }
    console.log(RegisterData);

    async function HandleSubmit(event) {
      event.preventDefault();
      const { email, password } = RegisterData;
  
      // Validation
      if (!email) return setError({ name: "email", message: "Email is required" });
      if (!email.includes("@gmail.com")) return setError({ name: "email", message: "Invalid Email address" });
      if (!password) return setError({ name: "password", message: "Password is required" });
      if (password.length < 8) return setError({ name: "password", message: "Password is too short (min: 8 characters)" });
  
      try {
        const LoginResponse = await dispatch(LoginThunk(RegisterData));
        console.log(LoginResponse);
        
        if (LoginResponse) {
          toast.success("Registration successful");
          setRegisterData(formData);
          authDispatch({type:"close"})
     // Reset form
          // authDispatch({ type: "otp" }); // Navigate to OTP step
        } else {
          // toast.error(LoginResponse || "Registration failed");
        }
      } catch (err) {
        console.log(err);
        
        toast.error("Error during registration");
      }
    }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Image Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-black to-indigo-900 hidden md:block relative">
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-12">
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold mb-6">Welcome Back</h2>
              <p className="text-xl mb-8">Unlock the full potential of AI-powered development</p>
              <button className="flex items-center justify-self-center justify-center space-x-2 bg-indigo-800 hover:bg-white/20 px-8 py-3 rounded-full transition-all duration-300">
                <span>Explore Features</span>
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="md:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
              <p className="text-gray-500">New user? 
                <Link to={"/signup"}   className="text-blue-600 hover:text-blue-700 ml-1">Create account</Link>
              </p>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-4 mb-8">
              <button onClick={HandleGoogleLogin} className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FcGoogle className="h-5 w-5 mr-2" />
                <span>Google</span>
              </button>
              <button onClick={HandleGithubLogin} className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FaGithub className="h-5 w-5 mr-2" />
                <span>GitHub</span>
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-gray-500 text-sm">Or sign in with email</span>
              </div>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={HandleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="enter a email"
                    name='email'
                    value={RegisterData.email}
                    onChange={HandleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <LockClosedIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="••••••••"
                    name='password'
                    value={RegisterData.password}
                    onChange={HandleChange}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}