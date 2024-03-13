import { Request, Response } from "express";
import { collectionName, dbName, urlOfDb } from "../server/databaseCredentials";
import path from "path";
import fs from "fs";
import FileDownload from "../server/databaseMethods/fileDownload";

export class DownloadFilesForUserController {
  static async downloadFiles(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const fileName = req.params.filename;

      const fileDownload = new FileDownload(urlOfDb, dbName, collectionName);

      const file = await fileDownload.findOneFileToDownload(userId, fileName);

      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      const filePath = path.join(__dirname, "../uploadsMulter", fileName);

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
  }
}
