import multer from "multer";
import path from "path";
import fs from "fs";

// Set storage configuration for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "../../../public";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true }); // Create directory if it doesn't exist
    }
    cb(null, dir); // Set the destination directory for uploads
  },
  filename: (req, file, cb) => {
    // Rename file to avoid overwriting
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Create multer instance with storage configuration
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
});
