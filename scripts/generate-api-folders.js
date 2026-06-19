const fs = require("fs");
const path = require("path");

// ============================================================
// ElimuX Automation Script: API Folder Auto-Generator (Node.js)
// ============================================================

const root = path.join(__dirname, "..", "app", "api");

const folders = [
  "institutions",
  "institutions/[id]",
  "institutions/[id]/views",
  "institutions/[id]/views/summary",
  "programs",
  "programs/[programId]",
  "programs/[programId]/stats",
  "applications",
  "applications/[id]",
  "staff",
  "staff/[id]",
  "documents",
  "documents/[id]",
  "events",
  "events/[id]",
  "messages",
  "messages/[id]",
  "students",
  "students/[id]",
  "ai",
  "ai/search",
  "ai/recommend",
  "ai/match"
];

folders.forEach(folder => {
  const fullPath = path.join(root, folder);

  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log("Created:", fullPath);
  } else {
    console.log("Exists:", fullPath);
  }
});

console.log("? API folder structure generation complete.");
