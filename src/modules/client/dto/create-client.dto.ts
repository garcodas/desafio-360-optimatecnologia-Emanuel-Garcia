import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  CompanyName!: string;

  @IsString()
  @IsNotEmpty()
  TradeName!: string;

  @IsString()
  @IsNotEmpty()
  DeliveryAddress!: string;

  @IsString()
  @IsNotEmpty()
  Phone!: string;

  @IsEmail()
  @IsNotEmpty()
  Email!: string;

  @IsInt()
  @IsNotEmpty()
  UserId!: number;

  @IsInt()
  @IsNotEmpty()
  StatusId!: number;
}
