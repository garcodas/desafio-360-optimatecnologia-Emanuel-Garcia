import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateStatusDto {
  @IsString()
  @IsOptional()
  Name!: string;
}
