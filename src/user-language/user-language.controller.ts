import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserLanguageService } from './user-language.service';
import { CreateUserLanguageDto } from './dto/create-user-language.dto';
import { UpdateUserLanguageDto } from './dto/update-user-language.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';

@Controller('user-language')
export class UserLanguageController {
  constructor(private readonly userLanguageService: UserLanguageService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Post()
  create(
    @Request() req: any,
    @Body() createUserLanguageDto: CreateUserLanguageDto,
  ) {
    return this.userLanguageService.create(req.account, createUserLanguageDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.userLanguageService.findAll(req.account);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.userLanguageService.findOne(req.account, +id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateUserLanguageDto: UpdateUserLanguageDto,
  ) {
    return this.userLanguageService.update(
      req.account,
      +id,
      updateUserLanguageDto,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.userLanguageService.remove(req.account, +id);
  }
}
