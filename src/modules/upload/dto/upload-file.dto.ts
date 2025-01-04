import { IsMimeType, IsNotEmpty, IsString } from "class-validator";

export class UploadFileDto {
  @IsString()
  @IsNotEmpty()
  originalName!: string;

  @IsMimeType({
    groups: ["image/jpeg", "image/png", "image/gif"],
    message: "Unsupported file type",
  })
  mimeType!: string;
}
