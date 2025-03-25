import { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { FaHtml5, FaCss3, FaJs, FaExpand } from 'react-icons/fa';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';
import parserBabel from 'prettier/parser-babel';
import parserPostcss from 'prettier/parser-postcss';

// Default code templates
const DEFAULT_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live Preview</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; }
  </style>
</head>
<body>
  <h1>Welcome to the Live Code Editor</h1>
  <p>Edit HTML, CSS, and JS in the left panel!</p>
</body>
</html>`;

const DEFAULT_CSS = `body {
  background-color: #f0f0f0;
  color: #333;
}`;

const DEFAULT_JS = `console.log("Welcome to the Live Code Editor!");`;

const CodeEditor = () => {
  const [html, setHtml] = useState(DEFAULT_HTML);
  const [css, setCss] = useState(DEFAULT_CSS);
  const [js, setJs] = useState(DEFAULT_JS);
  const [activeTab, setActiveTab] = useState('html');
  const [output, setOutput] = useState('');
  const [isEditorFullscreen, setIsEditorFullscreen] = useState(false);
  const editorRef = useRef(null);
  const [isFormatting, setIsFormatting] = useState(false);

  useEffect(() => {
    const savedCode = localStorage.getItem('editorCode');
    if (savedCode) {
      const { html, css, js } = JSON.parse(savedCode);
      setHtml(html);
      setCss(css);
      setJs(js);
    }
  }, []);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('editorCode', JSON.stringify({ html, css, js }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [html, css, js]);
  const formatCode = async () => {
    setIsFormatting(true);
    try {
      let formattedCode = '';
      const rawCode = activeTab === 'html' ? html : activeTab === 'css' ? css : js;
      
      formattedCode = prettier.format(rawCode, {
        parser: activeTab === 'html' ? 'html' : activeTab === 'css' ? 'css' : 'babel',
        plugins: [parserHtml, parserBabel, parserPostcss],
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        printWidth: 80
      });

      if (activeTab === 'html') setHtml(formattedCode);
      if (activeTab === 'css') setCss(formattedCode);
      if (activeTab === 'js') setJs(formattedCode);

      if (editorRef.current) {
        const model = editorRef.current.getModel();
        const formatPromise = editorRef.current.getAction('editor.action.formatDocument').run();
        await Promise.all([formatPromise]);
      }
    } catch (error) {
      console.error('Formatting error:', error);
    } finally {
      setIsFormatting(false);
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      formatCode();
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const combinedCode = `
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `;
      setOutput(combinedCode);
    }, 500);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const getLineCount = (code) => (code ? code.split('\n').length : 0);

  return (
    <div className={`h-screen flex flex-col ${isEditorFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Editor Section */}
      <div className="flex-1 flex bg-gray-900 text-white">
        <div className="w-1/2 flex flex-col border-r border-gray-700">
          <div className="flex justify-between items-center border-b border-gray-700 p-2">
            <div className="flex space-x-4">
              {['html', 'css', 'js'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center px-4 py-2 rounded ${
                    activeTab === tab ? 'bg-gray-800 text-white' : 'text-gray-400'
                  }`}
                >
                  {tab === 'html' && <FaHtml5 className="mr-2 text-orange-500" />}
                  {tab === 'css' && <FaCss3 className="mr-2 text-blue-500" />}
                  {tab === 'js' && <FaJs className="mr-2 text-yellow-500" />}
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsEditorFullscreen(!isEditorFullscreen)}
              className="p-2 hover:bg-gray-800 rounded"
            >
              <FaExpand className="text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-hidden">
            {activeTab === 'html' && (
              <Editor
                height="100%"
                defaultLanguage="html"
                theme="vs-dark"
                value={html}
                onChange={(value) => setHtml(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  formatOnPaste: true,
                  formatOnType: true,
                }}
                onMount={handleEditorDidMount}
              />
            )}

            {activeTab === 'css' && (
              <Editor
                height="100%"
                defaultLanguage="css"
                theme="vs-dark"
                value={css}
                onChange={(value) => setCss(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            )}

            {activeTab === 'js' && (
              <Editor
                height="100%"
                defaultLanguage="javascript"
                theme="vs-dark"
                value={js}
                onChange={(value) => setJs(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-1/2 flex flex-col">
          <div className="border-b border-gray-700 p-2 pb-4 text-xl font-black text-gray-400">
            Live Preview
          </div>
          <iframe
            title="preview"
            srcDoc={output}
            className="flex-1 bg-white border-none"
            sandbox="allow-scripts allow-modals"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-gray-400 p-2 text-sm flex justify-between items-center">
        <div>Online IDE - Powered by Monaco Editor</div>
        <div className="flex space-x-4">
          <span>Lines: {getLineCount(activeTab === 'html' ? html : activeTab === 'css' ? css : js)}</span>
          <span>Encoding: UTF-8</span>
          <span>Language: {activeTab.toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
