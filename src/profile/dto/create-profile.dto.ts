import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  slug: string;

  @IsString()
  name: string;

  @IsOptional()
  description?: string;

  @IsBoolean()
  isPrimary: boolean;
}
