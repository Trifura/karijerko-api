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
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() req: any, @Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(req.account, createProfileDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.profileService.findAll(req.account);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.profileService.findOne(req.account, +id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.update(req.account, +id, updateProfileDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Request() req: any, @Param('id') id: string) {
    return this.profileService.remove(req.account, +id);
  }
}
