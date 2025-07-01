// src/controllers/GetCode.js
import { spawn } from "child_process";
import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";
import os from "os";

// root temp folder once per container
const TMP_ROOT = path.join(os.tmpdir(), "online-ide");
await fs.mkdir(TMP_ROOT, { recursive: true });

const TIMEOUT_MS = 5000;           // hard kill after 5 s

export const GetCode = async (req, res) => {
  const { code, language } = req.body;
  const jobDir = path.join(TMP_ROOT, uuid());
  await fs.mkdir(jobDir);

  try {
    const output = await runJob({ code, language, jobDir });
    res.json({ output });
  } catch (err) {
    res.status(500).json({ output: err.message });
  } finally {
    // clean up
    await fs.rm(jobDir, { recursive: true, force: true });
  }
};

async function runJob({ code, language, jobDir }) {
  switch (language) {
    case "python":
      return execWithCapture("python3", ["-c", code]);

    case "c": {
      const src = path.join(jobDir, "main.c");
      await fs.writeFile(src, code);
      await execWithCapture("gcc", [src, "-o", path.join(jobDir, "main")]);
      return execWithCapture(path.join(jobDir, "main"));
    }

    case "cpp": {
      const src = path.join(jobDir, "main.cpp");
      await fs.writeFile(src, code);
      await execWithCapture("g++", [src, "-o", path.join(jobDir, "main")]);
      return execWithCapture(path.join(jobDir, "main"));
    }

    case "java": {
  // ① find the first public class (very simple regex)
  const m = code.match(/public\s+class\s+([A-Za-z_]\w*)/);
  if (!m) throw new Error("Could not find `public class …`");

  const className = m[1];                    // e.g. "Temp"
  const src = path.join(jobDir, `${className}.java`);

  // ② write the file and compile
  await fs.writeFile(src, code);
  await execWithCapture("javac", [src], { cwd: jobDir });

  // ③ run it
  return execWithCapture("java", ["-cp", jobDir, className]);
}


    default:
      throw new Error("Unsupported language");
  }
}

/**
 * Spawn a process and return stdout (or stderr if exit ≠ 0).
 */
function execWithCapture(cmd, args = [], opts = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { ...opts, timeout: TIMEOUT_MS });
    let out = "", err = "";

    proc.stdout.on("data", d => (out += d));
    proc.stderr.on("data", d => (err += d));

    proc.on("error", reject);
    proc.on("close", code => {
      if (code === 0) resolve(out.trim());
      else reject(new Error(err || `Process exited with ${code}`));
    });
  });
}

export default GetCode;
