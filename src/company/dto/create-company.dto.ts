import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsUrl,
  MinLength,
  IsPhoneNumber,
  IsDate,
  IsNumber,
} from 'class-validator';

export class CreateCompanyDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  profilePicture: string;

  @IsString()
  @IsNotEmpty()
  tagline: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsPhoneNumber(null, { message: 'Invalid phone number format' })
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsNotEmpty()
  industryId: number;

  @IsString()
  @IsNotEmpty()
  companySizeId: string;

  @IsString()
  @IsNotEmpty()
  headquarters: string;

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
