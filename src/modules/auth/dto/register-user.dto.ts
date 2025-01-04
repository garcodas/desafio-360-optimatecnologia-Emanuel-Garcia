import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  Email!: string;

  @IsString()
  @IsNotEmpty()
  FullName!: string;

  @IsString()
  @IsNotEmpty()
  Phone!: string;

  @IsDateString()
  @IsNotEmpty()
  BirthDate!: string;

  @IsString()
  @IsNotEmpty()
  Password!: string;
}
