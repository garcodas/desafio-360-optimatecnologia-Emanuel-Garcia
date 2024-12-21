import { IsDate, IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateUserSessionDto {
  @IsString()
  @IsNotEmpty()
  Token!: string;

  @IsString()
  @IsNotEmpty()
  UserId!: number;

  @IsDateString()
  @IsNotEmpty()
  ExpiresAt!: string;
}
