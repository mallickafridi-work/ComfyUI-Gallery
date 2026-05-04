// server/index.js
import express from "express";
import fs from "fs";
import path, { normalize } from "path";

const app = express();
app.use(express.json());

app.post("/api/load-path", (req, res) => {
  let { path: folderPath } = req.body;

  const normalized = folderPath.replace(/^["']|["']$/g, '')

  console.log("Scanning folder:", normalized);

  try {
    // Read directory contents
    const items = fs.readdirSync(normalized, { withFileTypes: true });

    // Collect only subfolders
    const subfolders = items.filter((item) => item.isDirectory()).map((dir) => dir.name);

    res.json({ status: "ok", path: folderPath, subfolders });
  } catch (err) {
    console.error("Error reading folder:", err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
})

// Route: list images in a folder
app.post("/api/load-images", (req, res) => {
  const { path: folderPath } = req.body;
  const normalized = path.normalize(folderPath);

  try {
    const items = fs.readdirSync(normalized, { withFileTypes: true });
    const images = items
      .filter(i => i.isFile())
      .map(f => f.name)
      .filter(name => /\.(jpg|jpeg|png|gif|webp)$/i.test(name))
      .map(name => ({
        name,
        url: `/api/image?folder=${encodeURIComponent(normalized)}&file=${encodeURIComponent(name)}`
      }));

    res.json({ status: "ok", images });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Route: serve a single image file
app.get("/api/image", (req, res) => {
  const { folder, file } = req.query;
  const filePath = path.join(folder, file);
  res.sendFile(filePath);
});

app.listen(5000, () => {
  console.log("Express server running on http://localhost:5000");
});