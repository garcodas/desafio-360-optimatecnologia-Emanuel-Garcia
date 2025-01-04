export class UploadService {
  saveFile(file: Express.Multer.File): string {
    return `/uploads/${file.filename}`;
  }
}
