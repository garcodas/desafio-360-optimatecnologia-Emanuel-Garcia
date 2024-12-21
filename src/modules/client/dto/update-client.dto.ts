import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  CompanyName?: string | null;

  @IsString()
  @IsOptional()
  TradeName?: string | null;

  @IsString()
  @IsOptional()
  DeliveryAddress?: string;

  @IsString()
  @IsOptional()
  Phone?: string;

  @IsEmail()
  @IsOptional()
  Email?: string;
}
