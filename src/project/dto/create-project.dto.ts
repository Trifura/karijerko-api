import { ProjectContent } from '../../project-content/entities/project-content.entity';
import { IsNumber, IsString } from 'class-validator';
import { Skill } from '../../skill/entities/skill.entity';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  profileId: number;

  skills: Skill[];

  contents: ProjectContent[];
}
