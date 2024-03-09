import { Request, Response } from "express";
import {
  findFilesByUserId,
  findOneFileToDownload,
  insertFile,
} from "../server/databaseMethods";
import path from "path";
import fs from "fs";
import { generateFileUrlForDatabase, upload } from "../utils/multer.utils";

export const multipleFilesFileUploadController = (
  req: Request,
  res: Response
) => {
  upload(req, res, async (error) => {
    if (error) {
      return res
        .status(error.message === "File type not allowed" ? 400 : 500)
        .json({ message: error.message });
    }

    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    try {
      const filesData = req.files as Express.Multer.File[];
      const userId = req.headers["userid"] as string;

      const filesToSave = filesData.map((file) => ({
        filename: file.filename,
        originalname: file.originalname,
        mimetype: file.mimetype,
        userId: userId,
        url: generateFileUrlForDatabase(file.filename, userId),
      }));

      const savedFiles = [];
      for (const fileToSave of filesToSave) {
        const result = await insertFile(fileToSave);
        savedFiles.push(result);
      }

      res.status(200).json({
        message: "Files uploaded successfully.",
        files: savedFiles,
      });
    } catch (error) {
      console.error("Error saving files to database:", error);
      res.status(500).json({ message: "Failed to save files to database." });
    }
  });
};

export const getFilesByUserId = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const files = await findFilesByUserId(userId);
    
    if (!files) {
      return res.status(404).json({ message: "Files not found for the user" });
    }

    const fileUrls = files.map((file) => {
      return {
        filename: file.filename,
        originalname: file.originalname,
        url: `http://localhost:3001/download/${userId}/${file.filename}`,
        mimetype: file.mimetype,
      };
    });

    res.status(200).json({
      message: "Files fetched successfully.",
      files: fileUrls,
    });
  } catch (error) {
    console.error("Error while fetching files:", error);
    res.status(500).json({ message: "Failed to fetch files" });
  }
};

export const downloadFilesForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const fileName = req.params.filename;

    const file = await findOneFileToDownload(userId, fileName);
    console.log(file);
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    const filePath = path.join(__dirname, "../uploadsMulter", fileName);
    console.log("Attempting to send file from path:", filePath);

    res.setHeader("Content-Type", file.mimetype);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(file.originalname)}"`
    );

    const fileStream = fs.createReadStream(filePath);

    fileStream.pipe(res);

    fileStream.on("error", function (error) {
      console.error("Error streaming the file:", error);
      res.end();
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ message: "Failed to download file" });
  }
};
