import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateJobAdDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  company: string;

  @IsString()
  @IsNotEmpty()
  adUrl: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsOptional()
  deadline: Date;

  @IsNumber()
  @IsOptional()
  numToHire: number;

  @IsString()
  @IsOptional()
  address: string;

  @IsBoolean()
  showAddress: boolean;

  @IsBoolean()
  willRelocate: boolean;

  @IsNumber()
  @IsOptional()
  hoursMin: number;

  @IsNumber()
  @IsOptional()
  hoursMax: number;

  @IsNumber()
  @IsOptional()
  hoursFixed: number;

  @IsNumber()
  @IsOptional()
  payMin: number;

  @IsNumber()
  @IsOptional()
  payMax: number;

  @IsNumber()
  @IsOptional()
  payFixed: number;
}
