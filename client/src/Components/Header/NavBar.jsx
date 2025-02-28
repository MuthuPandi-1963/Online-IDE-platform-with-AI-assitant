import { useContext, useState } from 'react';
import { CodeBracketIcon, CommandLineIcon, UserCircleIcon, ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AuthContext } from '../../store/Context/AuthContext';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const {authDispatch} = useContext(AuthContext)
  const data = useSelector(state=>state.auth)

  const navItems = [
    { name: 'Editor', href: '#editor' },
    { name: 'Documentation', href: '#docs' },
    // { name: 'Templates', href: '#templates' },
    // { name: 'Collaborate', href: '#collab' },
  ];

  return (
    <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700 sticky w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <CodeBracketIcon className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                CodeAI
              </span>
            </a>
            
            {/* AI Assistant Status */}
            <div className="ml-6 flex items-center space-x-2">
              <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span className="text-gray-300 text-sm">AI Assistant Online</span>
            </div>
          </div>

          {/* Middle Navigation (Desktop) */}
          <div className="hidden md:flex items-center space-x-6 ml-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-emerald-400 px-3 py-2 rounded-md transition-all duration-200 hover:bg-gray-800/50 flex items-center group"
              >
                {item.name}
                {item.name === 'Templates' && (
                  <ChevronDownIcon className="h-4 w-4 ml-1 text-gray-400 group-hover:text-emerald-400" />
                )}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center bg-gray-800 hover:bg-gray-700/80 text-emerald-400 px-4 py-2 rounded-lg transition-all duration-200">
              <CommandLineIcon className="h-5 w-5 mr-2" />
              Ask AI Assistant
            </button>

            {/* Profile Dropdown */}
            {/* <div className="relative"> */}
            {data.isAuthenticated ? 
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 hover:bg-gray-800/50 p-2 rounded-lg transition-colors"
              >
                <UserCircleIcon className="h-8 w-8 text-gray-400" />
                {/* <ChevronDownIcon className="h-4 w-4 text-gray-400" /> */}
                <p className='text-white'>{data.user.username}</p>
              </button> :  <div className="flex items-center gap-x-3">
                <button onClick={()=>authDispatch({type:"register"})} className='bg-gradient-to-br from-blue-600 to-blue-900 px-3 py-2 rounded-2xl text-white font-semibold '>Signup</button>
                <button onClick={()=>authDispatch({type:"login"})} className='font-black text-white ring-2 px-3 py-1 rounded-2xl'>Login</button>
              </div> }

              {/* Dropdown Menu */}
              {/* {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl py-2">
                  <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700/50">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700/50">
                    Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700/50">
                    Sign Out
                  </a>
                </div>
              )} */}
             
            {/* </div> */}

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
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-300 hover:bg-gray-800/50 rounded-md"
              >
                {item.name}
              </a>
            ))}
            <button className="w-full flex items-center justify-center bg-gray-800 hover:bg-gray-700/80 text-emerald-400 px-4 py-2 rounded-lg mt-2">
              <CommandLineIcon className="h-5 w-5 mr-2" />
              Ask AI Assistant
            </button>
          </div>
        )}
      </div>
      
    </nav>

  )
}