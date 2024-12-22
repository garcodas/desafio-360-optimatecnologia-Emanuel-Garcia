import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from "class-validator";
import { CreateOrderDetailDto } from "./create-order-detail";

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  FullName?: string;

  @IsString()
  @IsNotEmpty()
  Address?: string;

  @IsEmail()
  @IsNotEmpty()
  Email!: string;

  @IsString()
  @IsNotEmpty()
  Phone!: string;

  @IsInt()
  @IsNotEmpty()
  UserId!: number;

  @IsInt()
  @IsNotEmpty()
  StatusId!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  Products!: CreateOrderDetailDto[];
}
