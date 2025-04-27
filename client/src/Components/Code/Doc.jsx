import React, { useState } from 'react';
import { FaCode, FaRobot, FaTerminal, FaCloudUploadAlt, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const Documentation = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const codeExample = `// AI-powered code completion
function calculateSum(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}

// Ask AI assistant for optimization
// Type '/optimize' and press Enter`;

  const aiFeatures = [
    "Smart code completion",
    "Real-time error detection",
    "Code optimization suggestions",
    "Natural language to code conversion",
    "Automated code documentation"
  ];

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: <FaTerminal /> },
    { id: 'ai-integration', title: 'AI Integration', icon: <FaRobot /> },
    { id: 'collaboration', title: 'Real-time Collaboration', icon: <FaUsers /> },
    { id: 'deployment', title: 'Cloud Deployment', icon: <FaCloudUploadAlt /> },
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl text-blue-400 font-bold">⌘</span>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                CODE-FOX
              </span>
              <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                            <span className="text-xl font-bold">&gt;_</span>
                        </div>
            </Link>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <nav>
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="w-full flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors mb-2"
                >
                  <span className="text-gray-600 mr-2">{section.icon}</span>
                  <span className="text-gray-700 font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
            <div className="border-t my-4"></div>
            <button
              onClick={() => setOpenDialog(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Live Support
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Getting Started Section */}
          <section id="getting-started" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Getting Started</h2>
            <div className="space-y-4 text-gray-600">
              <p>Welcome to our AI-powered Online IDE. To begin:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Create a new project or upload existing files</li>
                <li>Use the AI assistant for code suggestions (Ctrl+Space)</li>
                <li>Collaborate with team members in real-time</li>
                <li>Deploy directly to cloud platforms</li>
              </ol>
            </div>
            
            <div className="mt-6 rounded-lg overflow-hidden">
              <SyntaxHighlighter 
                language="javascript" 
                style={darcula}
                className="p-4 text-sm"
              >
                {codeExample}
              </SyntaxHighlighter>
            </div>
          </section>

          {/* AI Integration Section */}
          <section id="ai-integration" className="mb-12">
            <div className="flex items-center mb-6">
              <FaRobot className="text-3xl text-green-600 mr-2" />
              <h2 className="text-3xl font-bold text-gray-800">AI Integration</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {aiFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">{feature}</h3>
                  <p className="text-gray-600 text-sm">
                    {feature === "Natural language to code conversion" 
                      ? 'Type "Create a React component that..." to generate code'
                      : 'Use keyboard shortcuts to access AI features'}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Support Modal */}
      {openDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Live Support</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium">Email:</p>
                <p className="text-blue-600">support@ide.com</p>
              </div>
              <div>
                <p className="font-medium">Chat:</p>
                <p className="text-gray-600">Click the chat icon in bottom-right</p>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-200">
        <p className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} Online IDE. All rights reserved. | 
          <a href="/terms" className="ml-1 text-blue-600 hover:underline">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
};

export default Documentation;