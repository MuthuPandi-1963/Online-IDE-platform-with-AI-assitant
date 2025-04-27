import { FiCode, FiZap, FiLayout, FiTerminal, FiChevronRight } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-sky-900 text-white">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s infinite`
            }}
          />
        ))}
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 flex items-center justify-center ga-2">
          <span className="text-5xl text-sky-500 font-bold pr-2">⌘</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300">
              CODE-FOX 
            </span>
            <div className="w-12 h-12 bg-black ml-4 rounded-lg flex items-center justify-center">
                            <span className="text-3xl font-bold">&gt;_</span>
                        </div>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Your modern web development playground with real-time collaboration, 
            intelligent code completion, and instant preview.
          </p>
          <button
            onClick={() => navigate('/codeEditor')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
          >
            Start Coding Now
            <FiChevronRight className="text-xl" />
          </button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all"
            >
              <div className="text-blue-400 mb-4 text-3xl">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Quick Start Section */}
        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-2xl font-bold mb-6">Jump Start</h2>
          <div className="grid gap-4">
            {templates.map((template) => (
              <div 
                key={template.name}
                className="group flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer transition-all"
              >
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <p className="text-sm text-gray-400">{template.description}</p>
                </div>
                <FiChevronRight className="text-gray-400 group-hover:text-blue-400 transform group-hover:translate-x-2 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Animated gradient border bottom  */}

      {/* <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x" /> */}
    </div>
  );
};

const features = [
  {
    icon: <FiCode />,
    title: "Smart Editor",
    description: "Monaco-powered editor with auto-completion, linting and Vim/Emacs modes"
  },
  {
    icon: <FiZap />,
    title: "Live Preview",
    description: "Real-time output preview with console integration and mobile view"
  },
  {
    icon: <FiLayout />,
    title: "Templates",
    description: "Professional starter templates for React, Vue, and modern workflows"
  },
  // {
  //   icon: <FiTerminal />,
  //   title: "CLI Integration",
  //   description: "Connect with local development environment via CLI tool"
  // },
];

const templates = [
  { name: "Blank Project", description: "Start from scratch with empty files" },
  { name: "React Starter", description: "Modern React template with Vite configuration" },
  { name: "Landing Page", description: "Responsive landing page with Tailwind CSS" },
  { name: "API Playground", description: "Preconfigured Axios + SWR setup" },
];

// Add CSS animations
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  .animate-gradient-x {
    background-size: 200% 200%;
    animation: gradient-x 5s ease infinite;
  }

  @keyframes gradient-x {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

export default WelcomePage;