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

export class CreateCompanyDto {
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
  industryId?: number;

  @IsOptional()
  @IsString()
  companySizeId?: string;

  @IsOptional()
  @IsString()
  headquarters?: string;

  @IsDate()
  @IsOptional()
  foundedAt?: Date;

  @IsString()
  @IsOptional()
  specialties?: string;

  @IsString()
  @IsOptional()
  locations?: string;
}
