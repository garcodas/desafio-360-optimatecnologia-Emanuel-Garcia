import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateOrderDetailDto {
  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsNotEmpty()
  Qty!: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsNotEmpty()
  UnitPrice!: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 2 })
  @IsNotEmpty()
  SubTotal!: number;

  @IsNumber()
  @IsNotEmpty()
  ProductId!: number;
}
