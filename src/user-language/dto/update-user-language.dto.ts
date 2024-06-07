import { PartialType } from '@nestjs/mapped-types';
import { CreateUserLanguageDto } from './create-user-language.dto';

export class UpdateUserLanguageDto extends PartialType(CreateUserLanguageDto) {}
