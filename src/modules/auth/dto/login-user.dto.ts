import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  Email!: string;

  @IsString()
  @IsNotEmpty()
  Password!: string;
}
