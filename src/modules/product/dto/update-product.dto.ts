import { IsInt, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  Name!: string;

  @IsString()
  @IsOptional()
  Brand!: string;

  @IsString()
  @IsOptional()
  Barcode!: string;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsOptional()
  Stock!: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsOptional()
  Price!: number;

  @IsString()
  @IsOptional()
  ImageUrl!: string;

  @IsInt()
  @IsOptional()
  ProductCategoryId!: number;

  @IsInt()
  @IsOptional()
  StatusId!: number;
}
