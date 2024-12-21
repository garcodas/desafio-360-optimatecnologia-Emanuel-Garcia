import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateClientDto {
  @IsString()
  @IsOptional()
  CompanyName?: string | null;

  @IsString()
  @IsOptional()
  TradeName?: string | null;

  @IsString()
  @IsNotEmpty()
  DeliveryAddress!: string;

  @IsString()
  @IsNotEmpty()
  Phone!: string;

  @IsEmail()
  @IsNotEmpty()
  Email!: string;
}
