import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import db from "./server/database";
import path from "path";
import { GetFilesByUserIdController } from "./controllers/getFilesByUserId.controller";
import { DownloadFilesForUserController } from "./controllers/downloadFilesForUser.controller";
import { MultipleFilesFileUploadController } from "./controllers/multipleFilesFileUpload.controller";

dotenv.config();

const app = express();
const port = 3001;

app.use(cors({ credentials: true }));

app.use(
  "/uploadsMulter",
  express.static(path.join(__dirname, "../uploadsMulter"))
);

app.get("/", (req: Request, res: Response) => {
  res.json("this is the spine of app");
});

app.get("/files/:userId", GetFilesByUserIdController.getFiles);

app.get(
  "/download/:userId/:filename",
  DownloadFilesForUserController.downloadFiles
);

app.post("/upload-files", MultipleFilesFileUploadController.uploadFiles);

db();

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
