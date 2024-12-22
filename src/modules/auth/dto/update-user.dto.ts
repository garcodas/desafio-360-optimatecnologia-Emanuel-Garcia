import { IsDateString, IsOptional, IsString } from "class-validator";
import { UpdateClientDto } from "../../client/dto/update-client.dto";

export class UpdateUserDto extends UpdateClientDto {
  @IsString()
  @IsOptional()
  FullName?: string;

  @IsString()
  @IsOptional()
  Password?: string;

  @IsDateString()
  @IsOptional()
  BirthDate?: string;
}
