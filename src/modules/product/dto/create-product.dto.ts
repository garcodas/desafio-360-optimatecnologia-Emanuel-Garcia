import { IsInt, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  Name!: string;

  @IsString()
  @IsNotEmpty()
  Brand!: string;

  @IsString()
  @IsNotEmpty()
  BarCode!: string;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsNotEmpty()
  Stock!: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsNotEmpty()
  Price!: number;

  @IsString()
  @IsNotEmpty()
  ImageUrl!: string;

  @IsInt()
  @IsNotEmpty()
  ProductCategoryId!: number;

  @IsInt()
  @IsNotEmpty()
  StatusId!: number;

  @IsInt()
  @IsNotEmpty()
  UserId!: number;
}
