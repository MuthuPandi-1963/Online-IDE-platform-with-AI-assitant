import { useContext, useState } from 'react';
import { CodeBracketIcon, CommandLineIcon, UserCircleIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../../store/Context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import LogoutThunk from '../../store/Thunks/LogoutThunk';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { authDispatch } = useContext(AuthContext);
  const data = useSelector(state => state.auth);
  const location = useLocation();
  const dispatch = useDispatch()

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'WEB', href: '/codeEditor' },
    { name: 'Programming', href: '/programming' },
    { name: 'Docs', href: '/docs' },
    { name: 'About', href: '/about' },
  ];

  // Function to check active link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-900 backdrop-blur-md border-b  sticky w-full z-50">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between  h-16">
          {/* Left Section */}
          <div className="flex items-center ">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl text-blue-400 font-bold">⌘</span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                CODE-FOX
              </span>
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold">&gt;_</span>
                        </div>
            </Link>
            {/* AI Assistant Status */}
            <div className="ml-6 flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-gray-300 text-sm max-sm:hidden">AI Assistant Online</span>
            </div>
          </div>

          {/* Middle Navigation (Desktop) */}
          <div className="hidden md:flex items-center space-x-6 ml-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md transition-all duration-200 flex items-center group
                  ${isActive 
                    ? 'text-emerald-400 bg-gray-800/50 font-bold'
                    : 'text-gray-300 hover:text-emerald-400 hover:bg-gray-800/30'}`
                }
              >
                {item.name}
                
              </NavLink>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <Link to={"code_generator"}  className="hidden md:flex items-center bg-gray-800 hover:bg-gray-700/80 text-emerald-400 px-4 py-2 rounded-lg transition-all duration-200">
              <CommandLineIcon className="h-5 w-5 mr-2" />
              Ask AI Assistant
            </Link>

            {/* Profile Section */}
            {data.isAuthenticated ? (
  <div className="relative">
    <button
      onClick={() => setIsProfileOpen(!isProfileOpen)}
      className="flex items-center space-x-2 hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
    >
      <UserCircleIcon className="h-8 w-8 text-gray-400" />
      <p className='text-white'>{data.user.username}</p>
    </button>

    {/* Profile Dropdown */}
    {isProfileOpen && (
      <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl py-2 z-50">
        <div className="px-4 py-3 border-b border-gray-700">
          <p className="text-sm text-gray-300">{data.user.email}</p>
        </div>
        
        <div className="py-1">
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800/50 transition-colors"
          >
            Profile Settings
          </Link>
          <button
            onClick={() => {
              dispatch(LogoutThunk()); // Your logout action
              setIsProfileOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-800/50 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    )}
  </div>
) : (
  <div className="flex items-center gap-x-3">
    <Link 
      to="signup" 
      className='bg-gradient-to-br from-blue-600 to-blue-900 px-3 py-2 rounded-2xl text-white font-semibold hover:opacity-90 transition-opacity'
    >
      Signup
    </Link>
    <Link 
      to="login" 
      className='font-black text-white ring-2 px-3 py-1 rounded-2xl hover:ring-emerald-400 transition-all'
    >
      Login
    </Link>
  </div>
)}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800/50"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-400" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md transition-colors
                  ${isActive 
                    ? 'text-emerald-400 bg-gray-800/50 font-bold'
                    : 'text-gray-300 hover:bg-gray-800/30'}`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <Link to={"code_generator"} className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700/80 text-emerald-400 px-4 py-2 rounded-lg mt-2">
              <CommandLineIcon className="h-5 w-5 mr-2" />
              Ask AI Assistant
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}