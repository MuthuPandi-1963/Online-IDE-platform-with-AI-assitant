import { useState } from 'react';
import { FaUser, FaSpinner } from "react-icons/fa";
import { FiChevronRight } from 'react-icons/fi';
import { TbMessageChatbotFilled } from "react-icons/tb";
import Editor from "@monaco-editor/react";
import { useDispatch } from 'react-redux';
import AiCodeThunk from '../../store/Thunks/AI_CodeThunk';

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch()

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const renderContent = (content) => {
    const blocks = content.split("```");
    return blocks.map((block, index) => {
      if (index % 2 === 0) {
        return block.split("\n").map((line, i) => {
          if (line.startsWith("### ")) {
            return (
              <h2 key={i} className="text-lg font-semibold mt-4 text-blue-400">
                {line.replace("### ", "")}
              </h2>
            );
          }
          return <p key={i} className="text-gray-300">{line}</p>;
        });
      } else {
        const language = block.match(/^\w+/)?.[0] || 'plaintext';
        const codeContent = block.replace(language, "").trim();
        const lineCount = codeContent.split('\n').length;
        const editorHeight = Math.max(lineCount * 19 + 20, 100);

        return (
          <div key={index} className="relative my-4 rounded-md overflow-hidden">
            <Editor
              height={editorHeight}
              theme="vs-dark"
              language={language}
              value={codeContent}
              
              options={{ 
                readOnly: true, 
                minimap: { enabled: false },
                lineNumbers: 'off',
                scrollBeyondLastLine: false,
                contextmenu: false,
                scrollbar: {
                  vertical: 'hidden',
                  horizontal: 'hidden',
                  handleMouseWheel: false
                  
                }
              }}
              className=''
            />
            <button
              onClick={() => copyToClipboard(codeContent)}
              className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 transition-colors"
            >
              Copy
            </button>
          </div>
        );
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }]);
    
    // Set typing state
    setIsTyping(true);

    try {
        // Dispatch AI request
        const AIResponse = await dispatch(AiCodeThunk({ content: input }));
        console.log(AIResponse);
        
        // Extract response text
        const botMessage = AIResponse?.payload?.data?.message?.content || "Sorry, I couldn't generate a response.";

        // Add bot response after delay
        setTimeout(() => {
            setMessages(prev => [...prev, { text: botMessage, isUser: false }]);
            setIsTyping(false);
        }, 1000);
    } catch (error) {
        console.error("AI Response Error:", error);
        setMessages(prev => [...prev, { text: "An error occurred. Please try again.", isUser: false }]);
        setIsTyping(false);
    }

    setInput('');
};


  return (
    <div className="bg-gray-900 w-full">
      <div className="flex flex-col h-[80vh] max-h-[700px] w-full mx-auto bg-gray-900 shadow-2xl overflow-hidden">
        {messages.length !== 0 && (
          <div className="p-4 bg-gray-900  grid justify-end">
            <div className="flex items-center gap-2">
              <span className="text-xl text-sky-400 font-bold">⌘</span>
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
                CODE-FOX
              </h1>
              <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center ml-2">
                <span className="text-sm font-bold text-white">&gt;_</span>
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 py-8 space-y-4 w-[95%] mx-auto">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full pt-8 pb-16">
              <div className="text-center space-y-4">
                <TbMessageChatbotFilled className="text-5xl text-blue-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white">
                  Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300">CodeFox</span>
                </h2>
                <p className="text-gray-300 max-w-md mx-auto">
                  Your modern web development assistant with real-time code analysis 
                  and intelligent suggestions.
                </p>
                <button
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 mx-auto"
                >
                  Start Chatting
                  <FiChevronRight className="text-lg" />
                </button>
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div 
                key={i}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} items-start gap-3`}
              >
                {!msg.isUser && (
                  <TbMessageChatbotFilled className="text-xl text-blue-400 mt-2 flex-shrink-0" />
                )}
                <div className={` p-3 rounded-lg ${
                  msg.isUser 
                    ? 'bg-blue-600 text-white w-fit px-8' 
                    : 'bg-gray-900 text-gray-100 w-[75%]'
                }`}>
                  {!msg.isUser ? renderContent(msg.text) : msg.text}
                </div>
                {msg.isUser && (
                  <FaUser className="text-xl text-blue-400 mt-2 flex-shrink-0" />
                )}
              </div>
            ))
          )}

          {isTyping && (
            <div className="flex justify-start items-center gap-2">
              <TbMessageChatbotFilled className="text-xl text-blue-400" />
              <div className="bg-gray-800 p-3 rounded-lg">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-4 bg-gray-900 border-gray-700">
          <div className="flex gap-2 w-[96%] mx-auto mb-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isTyping ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Sending...
                </>
              ) : (
                'Send'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}