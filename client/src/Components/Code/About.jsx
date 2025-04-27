import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-black/90 text-gray-300 min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <span className="text-4xl text-blue-400 font-bold">⌘</span>
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              CODE-FOX
            </h1>
          </div>
          <p className="text-xl text-gray-400 mb-8">
            Revolutionizing Development with AI-Powered MERN Stack Innovation
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-12">
          <section>
            <h2 className="text-3xl font-semibold mb-6 text-emerald-400">Our Vision</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              At CODE-FOX, we empower developers to code smarter, faster, and more collaboratively. 
              Our cutting-edge Online IDE seamlessly integrates the flexibility of the MERN stack 
              (MongoDB, Express.js, React, Node.js) with artificial intelligence, redefining how 
              modern software is built, tested, and deployed.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6 text-cyan-400">Why Choose CODE-FOX?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-800/50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">🚀 AI-Powered Efficiency</h3>
                <p className="text-gray-300">
                  Leverage our advanced AI Assistant for intelligent code completion, 
                  real-time error detection, and context-aware suggestions. Reduce debugging 
                  time by 40% with predictive analytics.
                </p>
              </div>
              <div className="p-6 bg-gray-800/50 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">🔧 Full MERN Integration</h3>
                <p className="text-gray-300">
                  Native support for JavaScript/TypeScript, React components, Node.js APIs, 
                  and MongoDB connectivity. Pre-configured environments and instant deployment.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6 text-blue-400">Key Features</h2>
            <ul className="grid md:grid-cols-2 gap-4 list-disc pl-5">
              <li className="mb-3">Cloud-based IDE with zero setup required</li>
              <li className="mb-3">Real-time collaborative coding</li>
              <li className="mb-3">AI-guided code optimization</li>
              <li className="mb-3">Integrated MERN stack templates</li>
              <li className="mb-3">Enterprise-grade security (SOC 2 compliant)</li>
              <li className="mb-3">Interactive learning resources</li>
            </ul>
          </section>

          <section className="text-center border-t border-gray-700 pt-12">
            <h3 className="text-2xl font-semibold mb-6">Join Our Developer Community</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Connect with 50,000+ developers worldwide. Access exclusive tutorials, 
              participate in coding challenges, and accelerate your MERN stack mastery.
            </p>
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-emerald-400 to-cyan-500 text-black px-8 py-3 rounded-lg 
                       font-semibold hover:opacity-90 transition-opacity"
            >
              Start Coding Free
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;