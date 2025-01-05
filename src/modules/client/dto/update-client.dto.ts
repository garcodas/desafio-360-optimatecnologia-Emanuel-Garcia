import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  CompanyName?: string;

  @IsString()
  @IsOptional()
  TradeName?: string;

  @IsString()
  @IsOptional()
  DeliveryAddress?: string;

  @IsString()
  @IsOptional()
  Phone?: string;

  @IsEmail()
  @IsOptional()
  Email?: string;

  @IsNumber()
  @IsOptional()
  StatusId?: number;
}
