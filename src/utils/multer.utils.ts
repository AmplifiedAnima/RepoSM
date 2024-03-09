import { Request } from "express";
import multer from "multer";

export const generateFileUrlForDatabase = (
  filename: string,
  userId: string
): string => {
  const baseUrl = "http://localhost:3001";
  return `${baseUrl}/download/${userId}/${filename}`;
};

export const multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploadsMulter/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const allowedTypes = [
  "image/jpeg",
  "image/png",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export const fileFilterMulter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("File types not allowed"));
  }
};

export const upload = multer({
  storage: multerDiskStorage,
  fileFilter: fileFilterMulter,
}).array("files", 10);
