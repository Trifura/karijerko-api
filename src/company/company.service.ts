import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { IndustryService } from '../industry/industry.service';
import { CompanySizeService } from '../company_size/company_size.service';
import { QueryCompanyDto } from './dto/query-company.dto';

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

    if (createCompanyDto.industryId) {
      company.industry = await this.industryService.findOne(
        createCompanyDto.industryId,
      );
    }

    if (createCompanyDto.companySizeId) {
      company.companySize = await this.companySizeService.findOne(
        createCompanyDto.companySizeId,
      );
    }

    return this.companyRepository.save(company);
  }

  async findAll(
    query: QueryCompanyDto,
  ): Promise<{ data: Company[]; total: number }> {
    const { search, industryId, companySizeId, page, limit } = query;

    const qb = this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.industry', 'industry')
      .leftJoinAndSelect('company.companySize', 'companySize');

    if (search) {
      qb.andWhere(
        'company.name ILIKE :search OR company.description ILIKE :search',
        { search: `%${search}%` },
      );
    }

    if (industryId) {
      qb.andWhere('company.industry.id = :industryId', { industryId });
    }

    if (companySizeId) {
      qb.andWhere('company.companySize.id = :companySizeId', { companySizeId });
    }

    const [data, total] = await qb
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total };
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
