import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateProductCategoryDto {
  @IsString()
  @IsOptional()
  Name?: string;

  @IsInt()
  @IsOptional()
  StatusId?: number;
}
