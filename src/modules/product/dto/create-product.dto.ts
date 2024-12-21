import { IsInt, IsNotEmpty, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  Name!: string;

  @IsString()
  @IsNotEmpty()
  Brand!: string;

  @IsString()
  @IsNotEmpty()
  Barcode!: string;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsNotEmpty()
  Stock!: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsNotEmpty()
  Price!: number;

  @IsUrl()
  @IsNotEmpty()
  ImageUrl!: string;

  @IsInt()
  @IsNotEmpty()
  ProductCategoryId!: number;

  @IsInt()
  @IsNotEmpty()
  UserId!: number;

  @IsInt()
  @IsNotEmpty()
  StatusId!: number;
}
