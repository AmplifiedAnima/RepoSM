import { Request, Response } from "express";
import { collectionName, dbName, urlOfDb } from "../server/databaseCredentials";
import FileRetrieval from "../server/databaseMethods/fileRetrieval";

export class GetFilesByUserIdController {
  static async getFiles(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const filesRetrieval = new FileRetrieval(urlOfDb, dbName, collectionName);
      const files = await filesRetrieval.findFilesByUserId(userId);

      if (!files) {
        return res
          .status(404)
          .json({ message: "Files not found for the user" });
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
  }
}
