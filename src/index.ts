import express, { Request, Response } from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import db from "./server/database";
import {
  downloadFilesForUser,
  getFilesByUserId,
  multipleFilesFileUploadController,
} from "./controllers/fileUploadServiceMultipleFiles.controller";
import path from "path";

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

app.get("/files/:userId", getFilesByUserId);

app.get("/download/:userId/:filename", downloadFilesForUser);

app.post("/upload-files", multipleFilesFileUploadController);

db();

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
