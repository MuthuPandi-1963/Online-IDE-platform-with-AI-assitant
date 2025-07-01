import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInput, setLanguage } from "../../store/Slices/ProgrammingSlice";
import ProgrammingThunk from "../../store/Thunks/ProgrammingThunk";
import { Editor } from "@monaco-editor/react";
import { CommandLineIcon } from "@heroicons/react/24/outline";
import AiCodeThunk from "../../store/Thunks/AI_CodeThunk";
import { useNavigate } from "react-router-dom";

const CodeRunner = () => {
  const dispatch = useDispatch();
  const { input, language, output, loading, error, errorMessage } = useSelector(
    (state) => state.programming
  );
  const data = useSelector(state=>state.auth)
  const [editorReady, setEditorReady] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [promptInput, setPromptInput] = useState("");
  const [isAILoading, setIsAILoading] = useState(false);
  const navigate = useNavigate()
  const handleOpenAI = () => {
    if(!data?.isAuthenticated){
      navigate("/login")
    }
    setShowPrompt(true)
  };

  const handleSubmit = async () => {
    setIsAILoading(true); // Start loading
    try {
      const getCode = await dispatch(AiCodeThunk({
        content: `Write a ${language} program only for ${promptInput}. Ensure it contains only pure code, avoids user input, and uses predefined values. No explanations, No title needed like("python X").`
      }));
      console.log(getCode);
      
      const botMessage = getCode?.payload?.data?.message?.content || "print('Sorry some issues happened , Please try Again ..')";
      const answer = botMessage.split(language+"\n")[1].split("```")[0];
      
      if (botMessage) {
        dispatch(setInput(answer));
      }
    } finally {
      handleRunCode()
      setIsAILoading(false); // Stop loading regardless of success/error
      setShowPrompt(false);
      setPromptInput('');
    }
  };


  const handleCancel = () => {
    setShowPrompt(false);
    setPromptInput("");
  };

  const editorOptions = {
    lineNumbers: true,
    minimap: { enabled: false },
    automaticLayout: true,
    scrollBeyondLastLine: false,
    roundedSelection: false,
    padding: { top: 10 },
    cursorBlinking: "smooth",
    formatOnType: true,
    formatOnPaste: true,
    autoClosingBrackets: "always",
    autoIndent: "advanced",
    suggestOnTriggerCharacter: true,
    quickSuggestions: true,
    snippetSuggestions: "bottom",
    parameterHints: { enabled: true },
    theme: "vs-dark",
  };

  const handleEditorMount = () => setEditorReady(true);

  const handleLanguageChange = (e) => {
    dispatch(setLanguage(e.target.value));
  };

  const handleRunCode = () => {
    dispatch(ProgrammingThunk({ code: input, language }));
  };

  return (
    <div className="h-screen bg-black/90 text-gray-100 font-mono flex flex-col">
      <div className="flex flex-1">
        {/* Editor Section */}
        <div className="w-1/2 h-full flex flex-col border-r border-gray-700">
          <div className="bg-gray-800 p-4 flex items-center justify-between">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="bg-gray-900 py-2 px-4 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            >
              <option value="python">Python</option>
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
            </select>
            <button
              onClick={handleOpenAI}
              className="hidden md:flex items-center bg-gray-800 hover:bg-gray-700/80 text-emerald-400 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <CommandLineIcon className="h-5 w-5 mr-2" />
              Ask AI Assistant
            </button>
            <button
              onClick={handleRunCode}
              disabled={loading}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-md text-sm font-medium transition-all disabled:opacity-50"
            >
              <i className="fas fa-play mr-2"></i>
              {loading ? "Running..." : "Run Code"} (⌘⏎)
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={language}
              value={input}
              options={editorOptions}
              onChange={(value) => dispatch(setInput(value))}
              onMount={handleEditorMount}
              loading={
                <div className="text-gray-400 p-4">Loading editor...</div>
              }
            />
          </div>
        </div>

        {/* AI Prompt Modal */}
        {showPrompt && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-lg mx-4">
              <h3 className="text-lg font-semibold text-emerald-400 mb-4">
                Ask AI Assistant
              </h3>
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg p-4 mb-4 disabled:opacity-75"
                placeholder="Enter your question..."
                rows={4}
                autoFocus
                disabled={isAILoading} // Disable during loading
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg hover:bg-gray-700/80 transition-colors disabled:opacity-75"
                  disabled={isAILoading} // Disable during loading
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isAILoading}
                  className="px-4 py-2 bg-emerald-400 text-gray-900 rounded-lg hover:bg-emerald-300 transition-colors flex items-center justify-center disabled:opacity-75"
                >
                  {isAILoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Output & Features Section */}
        <div className="w-1/2 flex flex-col">
          <div className="h-1/2 bg-gray-900 p-4 overflow-auto border-b border-gray-700">
            <h3 className="text-sm font-semibold text-gray-400 mb-2">OUTPUT</h3>
            {loading && (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
            )}
            {error ? (
              <div className="p-3 bg-red-900/20 border border-red-700/30 rounded-md">
                <div className="flex items-center mb-2 text-red-400">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  <span className="font-medium">Execution Error</span>
                </div>
                <pre className="text-red-300 text-sm whitespace-pre-wrap">
                  {errorMessage}
                </pre>
              </div>
            ) : (
              <pre className="p-3 bg-gray-800 rounded-md text-sm whitespace-pre-wrap font-mono">
                {output}
              </pre>
            )}
          </div>

          <div className="h-1/2 bg-gray-900 p-4 overflow-y-auto">
            <h3 className="text-sm font-semibold text-gray-400 mb-4">
              FEATURES
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="text-blue-400 mb-2 text-lg">
                  <i className="fas fa-code"></i>
                </div>
                <h4 className="font-medium mb-1">IntelliSense</h4>
                <p className="text-xs text-gray-400">
                  Smart code completions (Ctrl+Space)
                </p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="text-purple-400 mb-2 text-lg">
                  <i className="fas fa-sync-alt"></i>
                </div>
                <h4 className="font-medium mb-1">Live Execution</h4>
                <p className="text-xs text-gray-400">
                  Real-time code execution
                </p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="text-green-400 mb-2 text-lg">
                  <i className="fas fa-bug"></i>
                </div>
                <h4 className="font-medium mb-1">Error Highlighting</h4>
                <p className="text-xs text-gray-400">
                  Inline syntax diagnostics
                </p>
              </div>
              <div className="p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <div className="text-yellow-400 mb-2 text-lg">
                  <i className="fas fa-keyboard"></i>
                </div>
                <h4 className="font-medium mb-1">Shortcuts</h4>
                <p className="text-xs text-gray-400">Ctrl+S: Save, ⌘⏎: Run</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-900 px-4 py-2 border-t border-gray-800 flex justify-between text-xs">
        <div className="flex items-center space-x-4">
          <span className="text-blue-400">
            <i className="fas fa-code"></i> {language.toUpperCase()}
          </span>
          <span className="text-gray-400">Monaco Editor v0.34</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400">UTF-8</span>
          <span className="text-gray-400">LF</span>
          <button className="text-blue-400 hover:text-blue-300">
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeRunner;
