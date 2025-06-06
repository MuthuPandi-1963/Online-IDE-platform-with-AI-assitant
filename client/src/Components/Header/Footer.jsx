import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaRegEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black/90 text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Left Section */}
          <div className="text-center md:text-left">
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
            <p className="text-sm my-2">Code, Compile & Execute Powered by MERN Stack</p>
          </div>

          {/* Middle Section */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-emerald-400 transition-colors">About</a>
              </li>
              <li>
                <a href="/docs" className="hover:text-emerald-400 transition-colors">Documentation</a>
              </li>
              <li>
                <a href="/examples" className="hover:text-emerald-400 transition-colors">Examples</a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-center md:justify-end">
                <FaRegEnvelope className="mr-2" />
                <a href="mailto:support@onlineide.com" className="hover:text-emerald-400 transition-colors">
                  angelinsnekha2002@gmail.com
                </a>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end mt-4 space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-emerald-400 transition-colors">
                <FaGithub className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-emerald-400 transition-colors">
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="hover:text-emerald-400 transition-colors">
                <FaTwitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-600 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Online IDE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;