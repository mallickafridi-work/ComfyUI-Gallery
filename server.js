// server/index.js
import express from "express";
import fs from "fs/promises";
import path, { normalize } from "path";

const app = express();
app.use(express.json());

// Recursive function to build folder tree
async function getFolderTree(folderPath) {
  const node = {
    name: path.basename(folderPath),
    path: folderPath,
    children: []
  };

  let items;
  try {
    items = await fs.readdir(folderPath, { withFileTypes: true });
  } catch (err) {
    console.error("Error reading folder:", folderPath, err.message);
    return node; // return node with empty children
  }

  for (const item of items) {
    if (item.isDirectory()) {
      const subPath = path.resolve(folderPath, item.name);
      const childNode = await getFolderTree(subPath); // recursion
      node.children.push(childNode);
    }
  }

  return node;
}

app.post("/api/load-path", async (req, res) => {
  const { path: folderPath } = req.body;
  const normalized = path.resolve(folderPath);

  try {
    const tree = await getFolderTree(normalized);
    res.json({ status: "ok", path: normalized, tree });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Route: list images in a folder
app.post("/api/load-images", async (req, res) => {
  const { path: folderPath } = req.body;
  const normalized = path.normalize(folderPath);

  try {
    const items = await fs.readdir(normalized, { withFileTypes: true });
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
app.get("/api/image", async (req, res) => {
  const { folder, file } = req.query;
  const filePath = path.join(folder, file);
  res.sendFile(filePath);
});

app.listen(5000, () => {
  console.log("Express server running on http://localhost:5000");
});