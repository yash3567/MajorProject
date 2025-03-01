import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { ProjectFile } from "../models/ProjectFile.js";

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage (Temp Storage Before Uploading to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload File API
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "raw" }, 
        (error, uploadedFile) => {
          if (error) reject(error);
          else resolve(uploadedFile);
        }
      ).end(file.buffer);
    });

    const newFile = new ProjectFile({
      userId: req.body.userId,
      fileName: file.originalname,
      fileType: file.mimetype,
      fileUrl: uploadResponse.secure_url,
    });

    await newFile.save();
    res.status(200).json(newFile);
  } catch (error) {
    res.status(500).json({ error: "Upload failed: " + error.message });
  }
});

// Fetch User Files API (Fixed Endpoint)
router.get("/:userId", async (req, res) => {
  try {
    const files = await ProjectFile.find({ userId: req.params.userId });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: "Error fetching files" });
  }
});

export default router;
