import { useContext, useState } from 'react';
import { EnvelopeIcon, LockClosedIcon, UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { AuthContext } from '../../store/Context/AuthContext';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import RegisterThunk from '../../store/Thunks/RegisterThunk';

const formData = {
    username:"",
    email :"",
    password :""
  }
export default function SignupPage() {
  const [passwordStrength, setPasswordStrength] = useState('');
  const { authDispatch } = useContext(AuthContext);
    const [RegisterData,setRegisterData]  = useState(formData) 
    const [error,setError] =useState({name:"",message:""})
    const dispatch = useDispatch()
    const BackendURl = import.meta.env.VITE_BACKEND_URL_LOCAL || "http://localhost:3000"

    const HandleChange = (e)=>{
      const {name,value} = e.target
      console.log(name,value);
      const {password} =  RegisterData
      const strength = password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8 
      ? 'Strong' 
      : password.length >= 6 
      ? 'Medium' 
      : 'Weak';
    setPasswordStrength(strength);
      setRegisterData((prev)=>({...prev,[name]:value}))
    }
    console.log(RegisterData);

    async function HandleSubmit(event) {
      event.preventDefault();
      const { email, username, password } = RegisterData;
  
      // Validation
      if (!username) return setError({ name: "username", message: "Username is required" });
      if (!email) return setError({ name: "email", message: "Email is required" });
      if (!email.includes("@gmail.com")) return setError({ name: "email", message: "Invalid Email address" });
      if (!password) return setError({ name: "password", message: "Password is required" });
      if (password.length < 8) return setError({ name: "password", message: "Password is too short (min: 8 characters)" });
  
      try {
        const RegisterResponse = await dispatch(RegisterThunk(RegisterData));
        console.log(RegisterResponse);
        
        if (RegisterResponse) {
          toast.success("Registration successful");
          setRegisterData(formData);
          authDispatch({type:"close"})
     // Reset form
          // authDispatch({ type: "otp" }); // Navigate to OTP step
        } else {
          // toast.error(RegisterResponse || "Registration failed");
        }
      } catch (err) {
        console.log(err);
        
        toast.error("Error during registration");
      }
    }
    async function HandleGoogleLogin(){
      window.location.href = `${import.meta.env.VITE_BACKEND_URL_LOCAL}/auth/google`;
      authDispatch({type:"close"})

  }
  async function HandleGithubLogin(){
    window.location.href = `${import.meta.env.VITE_BACKEND_URL_LOCAL}/auth/github/callback`;
    authDispatch({type:"close"})

}
  return (
    <div className="bg-gray-50">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Image Section */}
        <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 hidden md:block relative">
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-12">
            <div className="text-white text-center">
              <h2 className="text-4xl font-bold mb-6">Welcome to CodeAI</h2>
              <p className="text-xl mb-8">Join our community of developers and leverage AI-powered coding assistance</p>
              <button className="flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 px-8 py-3 rounded-full transition-all duration-300">
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-500">A Doelready have an account? 
                <button onClick={()=>authDispatch({type:"login"})} className="text-blue-600 hover:text-blue-700 ml-1">Sign in</button>
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
                <span className="px-2 bg-white text-gray-500 text-sm">Or continue with email</span>
              </div>
            </div>

            {/* Signup Form */}
            <form className="space-y-6" onSubmit={HandleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="enter a username"
                    value={RegisterData.username}
                    onChange={HandleChange}
                    name='username'
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="enter a email "
                    value={RegisterData.email}
                    onChange={HandleChange}
                    name='email'

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
                    // onChange={(e) => calculatePasswordStrength(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="••••••••"
                    onChange={(e)=>HandleChange(e)}
                    value={RegisterData.password}
                    name="password"

                  />
                </div>
                {passwordStrength && (
                  <div className="mt-2 text-sm">
                    Password Strength: 
                    <span className={`ml-2 font-medium ${
                      passwordStrength === 'Weak' ? 'text-red-500' :
                      passwordStrength === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                    }`}>
                      {passwordStrength}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}