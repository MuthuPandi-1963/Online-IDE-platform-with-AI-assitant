import { FaGithub, FaLinkedin, FaTwitter, FaCode, FaRegEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#2c3e50] text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Left Section */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <FaCode className="h-8 w-8 mr-2 text-emerald-400" />
              <span className="text-xl font-bold">Online IDE</span>
            </div>
            <p className="text-sm mb-2">Code, Compile & Execute</p>
            <p className="text-sm">Powered by MERN Stack</p>
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
                  muthupandir74738@gmail.com
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