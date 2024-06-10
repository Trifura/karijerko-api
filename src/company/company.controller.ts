import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { QueryCompanyDto } from './dto/query-company.dto';
import { AuthGuard } from '../auth/guards/Auth.guard';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll(@Query() query: QueryCompanyDto) {
    return this.companyService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }

  @Get('slug/:companySlug')
  findBySlug(@Param('companySlug') companySlug: string) {
    return this.companyService.findBySlug(companySlug);
  }

  @UseGuards(AuthGuard)
  @Patch('info')
  updateInfo(
    @Request() req: any,
    @Body() updateCompanyInfoDto: UpdateCompanyInfoDto,
  ) {
    return this.companyService.updateInfo(req.account, updateCompanyInfoDto);
  }

  @UseGuards(AuthGuard)
  @Get('me/info')
  getInfo(@Request() req: any) {
    return this.companyService.getInfo(req.account);
  }

  @UseGuards(AuthGuard)
  @Get('slug/:companySlug/user')
  fetchWithSub(@Request() req: any, @Param(':companySlug') slug: string) {
    return this.companyService.findWithSub(slug, req.account);
  }
}
