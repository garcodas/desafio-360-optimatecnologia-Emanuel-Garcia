import { Request, Response } from "express";
import { UploadService } from "../service/UploadServicet";

export class UploadController {
  private uploadService = new UploadService();

  async uploadImage(req: Request, res: Response) {
    if (!req.file) {
      res.status(400).json({ message: "No file uploaded!" });
      return;
    }

    const filePath = this.uploadService.saveFile(req.file);

    res.status(200).json(filePath);
  }
}
