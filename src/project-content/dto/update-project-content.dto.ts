import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectContentDto } from './create-project-content.dto';

export class UpdateProjectContentDto extends PartialType(CreateProjectContentDto) {}
