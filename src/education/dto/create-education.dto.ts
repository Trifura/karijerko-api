import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEducationDto {
  @IsNotEmpty()
  institution: string;

  @IsOptional()
  degree: string;

  @IsOptional()
  fieldOfStudy: string;

  startDate: Date;

  endDate: Date;
}
