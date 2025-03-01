import mongoose from "mongoose";

const ProjectFileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileUrl: { type: String, required: true },
}, { timestamps: true });

export const ProjectFile = mongoose.model("ProjectFile", ProjectFileSchema);
