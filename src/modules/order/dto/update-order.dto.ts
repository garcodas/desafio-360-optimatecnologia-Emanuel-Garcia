import { IsDateString, IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  FullName?: string;

  @IsString()
  @IsOptional()
  Address?: string;

  @IsEmail()
  @IsOptional()
  Email!: string;

  @IsString()
  @IsOptional()
  Phone!: string;

  @IsDateString()
  @IsOptional()
  DeliveryDate!: string;
}
