import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function ApiResponseViewer() {
  const sampleApiResponse = {
    id: "chatcmpl-fa04aef4-66de-18ea-5648-3b0f1df2bfd0",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: `Here's a simple login page designed using HTML and CSS:

### HTML (login.html)
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="login-container">
    <h1>Login</h1>
    <form action="#" method="POST">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" placeholder="Enter your username" required>
      <label for="password">Password</label>
      <input type="password" id="password" name="password" placeholder="Enter your password" required>
      <button type="submit">Login</button>
      <p>Don't have an account? <a href="#">Sign Up</a></p>
    </form>
  </div>
</body>
</html>
\`\`\`

### CSS (styles.css)
\`\`\`css
body {
  font-family: Arial, sans-serif;
  background-color: #f3f4f6;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
\`\`\`
      `,
      },
    }
    ],
  };

  const [apiData] = useState(sampleApiResponse);

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
              <h2 key={i} className="text-lg font-semibold mt-4 bg-gray-200 p-2 rounded-md">
                {line.replace("### ", "")}
              </h2>
            );
          }
          return <p key={i} className="text-gray-700">{line}</p>;
        });
      } else {
        const language = block.startsWith("html") ? "html" : block.startsWith("css") ? "css" : "plaintext";
        return (
          <div key={index} className="relative my-4 border border-gray-300 rounded-md shadow-md">
            <Editor
              height="200px"
              theme="vs-dark"
              language={language}
              value={block.replace(language, "").trim()}
              options={{ readOnly: true, minimap: { enabled: false } }}
            />
            <button
              onClick={() => copyToClipboard(block.replace(language, "").trim())}
              className="absolute top-2 right-2 bg-gray-700 text-white px-2 py-1 text-xs rounded hover:bg-gray-600"
            >
              Copy
            </button>
          </div>
        );
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4 bg-gray-300 p-3 rounded-md shadow">
        API Response Viewer
      </h1>
      <div className="bg-white shadow-md rounded-lg p-5">
        <h2 className="text-lg font-bold text-gray-700">API Response</h2>
        <p className="text-sm text-gray-600"><strong>ID:</strong> {apiData.id}</p>
        <div className="mt-4">{renderContent(apiData.choices[0].message.content)}</div>
      </div>
    </div>
  );
}
