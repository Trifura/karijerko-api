import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Company } from '../../company/entities/company.entity';

export class CreateAccountDto {
  @IsEmail()
  email: string;

  @IsString()
  password?: string;

  @IsEnum(['company', 'user'])
  role: string;

  @IsBoolean()
  isVerified: boolean;

  @IsOptional()
  @IsEnum(['google'])
  providerType?: string;

  @IsOptional()
  providerId?: string;

  @IsOptional()
  user?: User;

  @IsOptional()
  company?: Company;
}
