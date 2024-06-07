import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserLanguageService } from './user-language.service';
import { CreateUserLanguageDto } from './dto/create-user-language.dto';
import { UpdateUserLanguageDto } from './dto/update-user-language.dto';

@Controller('user-language')
export class UserLanguageController {
  constructor(private readonly userLanguageService: UserLanguageService) {}

  @Post()
  create(@Body() createUserLanguageDto: CreateUserLanguageDto) {
    return this.userLanguageService.create(createUserLanguageDto);
  }

  @Get()
  findAll() {
    return this.userLanguageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userLanguageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserLanguageDto: UpdateUserLanguageDto) {
    return this.userLanguageService.update(+id, updateUserLanguageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userLanguageService.remove(+id);
  }
}
