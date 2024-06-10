import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  IsPhoneNumber,
  IsDate,
  IsNumber,
} from 'class-validator';
import { Skill } from '../../skill/entities/skill.entity';
import { CompanySize } from '../../company_size/entities/company_size.entity';
import { Industry } from '../../industry/entities/industry.entity';

export class UpdateCompanyInfoDto {
  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  tagline?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsPhoneNumber(null, { message: 'Invalid phone number format' })
  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsNumber()
  industry?: Industry;

  @IsOptional()
  @IsString()
  companySize?: CompanySize;

  @IsOptional()
  @IsString()
  headquarters?: string;

  @IsDate()
  @IsOptional()
  foundedAt?: Date;

  @IsString()
  @IsOptional()
  locations?: string;

  @IsOptional()
  skills: Skill[];
}
