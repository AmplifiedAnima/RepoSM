import { Request, Response } from "express";
import { collectionName, dbName, urlOfDb } from "../server/databaseCredentials";
import { generateFileUrlForDatabase, upload } from "../utils/multer.utils";
import FileInsertion from "../server/databaseMethods/fileInsertion";

export class MultipleFilesFileUploadController {
  static async uploadFiles(req: Request, res: Response) {
    upload(req, res, async (error) => {
      if (error) {
        return res
          .status(error.message === "File type not allowed" ? 400 : 500)
          .json({ message: error.message });
      }

      if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
        return res.status(400).json({ message: "No files uploaded." });
      }

      const fileInsertion = new FileInsertion(urlOfDb, dbName, collectionName);

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
          const result = await fileInsertion.insertFile(fileToSave);
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
  }
}
