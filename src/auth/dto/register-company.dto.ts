import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegisterCompanyDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
