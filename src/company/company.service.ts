import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { IndustryService } from '../industry/industry.service';
import { CompanySizeService } from '../company_size/company_size.service';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
    private industryService: IndustryService,
    private companySizeService: CompanySizeService,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepository.create(createCompanyDto);

    company.industry = await this.industryService.findOne(
      createCompanyDto.industryId,
    );

    company.companySize = await this.companySizeService.findOne(
      createCompanyDto.companySizeId,
    );

    return this.companyRepository.save(company);
  }

  findAll() {
    return this.companyRepository.find({
      relations: ['industry', 'companySize'],
    });
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['industry', 'companySize'],
    });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.findOne(id);

    company.industry = await this.industryService.findOne(
      updateCompanyDto.industryId,
    );

    company.companySize = await this.companySizeService.findOne(
      updateCompanyDto.companySizeId,
    );

    this.companyRepository.merge(company, updateCompanyDto);

    return this.companyRepository.save(company);
  }

  async remove(id: string) {
    const result = await this.companyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    return { message: 'Company deleted successfully', success: true };
  }
}
