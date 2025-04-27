import { exec } from "child_process";
import fs from "fs";
import path from "path";

const GetCode = async (req, res) => {
  try {
    const { code, language } = req.body;
    let command = "";
    const tempDir = "./temp";
    
    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    switch (language) {
      case "python":
        command = `python3 -c "${code.replace(/"/g, '\\"')}"`;
        break;

      case "c": {
        const filePath = path.join(tempDir, "temp.c");
        fs.writeFileSync(filePath, code);
        command = `gcc ${filePath} -o ${tempDir}/temp.out && ${tempDir}/temp.out`;
        break;
      }

      case "cpp": {
        const filePath = path.join(tempDir, "temp.cpp");
        fs.writeFileSync(filePath, code);
        command = `g++ ${filePath} -o ${tempDir}/temp.out && ${tempDir}/temp.out`;
        break;
      }

      case "java": {
        const filePath = path.join(tempDir, "Temp.java");
        fs.writeFileSync(filePath, code);
        command = `javac ${filePath} && java -cp ${tempDir} Temp`;
        break;
      }

      default:
        return res.json({ output: "Unsupported language" });
    }

    // Execute command safely
    exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
      res.json({ output: error ? stderr : stdout });
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: {},
    });
  }
};
export default GetCode;