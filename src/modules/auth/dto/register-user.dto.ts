import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { CreateClientDto } from "../../client/dto/create-client.dto";

export class RegisterUserDto extends CreateClientDto {
  @IsString()
  @IsNotEmpty()
  FullName!: string;

  @IsString()
  @IsNotEmpty()
  Password!: string;

  @IsDateString()
  @IsNotEmpty()
  BirthDate!: string;
}
