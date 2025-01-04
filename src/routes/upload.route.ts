import { Router } from "express";
import multer from "multer";
import path from "path";
import { UploadController } from "../modules/upload/controller/UploadController";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/gif"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"));
  }
};

export const upload = multer({ storage, fileFilter });

const uploadRouter = Router();
const uploadController = new UploadController();

uploadRouter.post(
  "/product-image",
  upload.single("image"),
  uploadController.uploadImage.bind(uploadController)
);

export default uploadRouter;
