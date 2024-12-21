import { IsInt, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateStatusDto {
  @IsString()
  @IsNotEmpty()
  Name!: string;
}
