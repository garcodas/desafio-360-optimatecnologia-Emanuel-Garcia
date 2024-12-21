import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryProductDto {
  @IsString()
  @IsNotEmpty()
  Name!: string;

  @IsInt()
  @IsNotEmpty()
  UserId!: number;

  @IsInt()
  @IsNotEmpty()
  StatusId!: number;
}
