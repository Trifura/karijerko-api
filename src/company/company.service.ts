import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { IndustryService } from '../industry/industry.service';
import { CompanySizeService } from '../company_size/company_size.service';
import { QueryCompanyDto } from './dto/query-company.dto';
import { Skill } from '../skill/entities/skill.entity';
import { Account } from '../account/entities/account.entity';
import { UpdateCompanyInfoDto } from './dto/update-company-info.dto';
import slugify from 'slugify';

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

  async findAll(query?: QueryCompanyDto) {
    const {
      search,
      industryId,
      companySizeId,
      // page = 1,
      // limit = 10,
    } = query || {};

    const qb = this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect('company.industry', 'industry')
      .leftJoinAndSelect('company.companySize', 'companySize')
      .leftJoinAndSelect('company.skills', 'skills');

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

    return await qb.getMany();
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: ['industry', 'companySize', 'skills'],
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

    company.skills = updateCompanyDto.skills;

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

  async findBySlug(slug: string) {
    const company = await this.companyRepository.findOne({
      where: { slug },
      relations: ['industry', 'companySize', 'skills'],
    });
    if (!company) {
      throw new NotFoundException(`Company with slug ${slug} not found`);
    }
    return company;
  }

  async findAndSortBySkills(skills: Skill[]) {
    const skillIds = skills.map((skill) => skill.id);

    const query = this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndSelect(
        'company.skills',
        'skill',
        'skill.id IN (:...skillIds)',
        {
          skillIds,
        },
      )
      .leftJoinAndSelect('company.industry', 'industry')
      .leftJoinAndSelect('company.companySize', 'companySize')
      .groupBy('company.id')
      .addGroupBy('industry.id')
      .addGroupBy('companySize.id')
      .select([
        'company',
        'industry',
        'companySize',
        'COUNT(DISTINCT skill.id) AS skillCount',
      ])
      .orderBy('skillCount', 'DESC');

    return await query.getMany();
  }

  async updateInfo(
    account: Account,
    updateCompanyInfoDto: UpdateCompanyInfoDto,
  ) {
    const company = await this.findOne(account.company.id);

    company.slug = slugify(updateCompanyInfoDto.name, {
      lower: true,
      remove: /[*+~.()'"!:@]/g,
    });

    this.companyRepository.merge(company, updateCompanyInfoDto);

    return this.companyRepository.save(company);
  }

  async getInfo(account: Account) {
    return this.findOne(account.company.id);
  }

  async findWithSub(slug: string, account: Account) {
    const company = await this.companyRepository.findOne({
      where: { slug },
      relations: ['industry', 'companySize', 'skills', 'subscribers'],
    });

    if (!company) {
      throw new NotFoundException(`Company with Slug ${slug} not found`);
    }

    // Check if the user is subscribed
    const isSubscribed = company.subscribers.some(
      (subscriber) => subscriber.id === account.user.id,
    );

    return { ...company, isSubscribed, subscribers: undefined };
  }
}
