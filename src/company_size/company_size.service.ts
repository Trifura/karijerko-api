import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanySizeDto } from './dto/create-company_size.dto';
import { UpdateCompanySizeDto } from './dto/update-company_size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CompanySize } from './entities/company_size.entity';

@Injectable()
export class CompanySizeService {
  constructor(
    @InjectRepository(CompanySize)
    private companySizeRepository: Repository<CompanySize>,
  ) {}
  create(createCompanySizeDto: CreateCompanySizeDto) {
    return 'This action adds a new companySize';
  }

  findAll() {
    return `This action returns all companySize`;
  }

  async findOne(id: string) {
    const companySize = await this.companySizeRepository.findOne({
      where: { id },
    });

    if (!companySize) {
      throw new NotFoundException(`Company size with ID ${id} not found`);
    }

    return companySize;
  }

  update(id: string, updateCompanySizeDto: UpdateCompanySizeDto) {
    return `This action updates a #${id} companySize`;
  }

  remove(id: string) {
    return `This action removes a #${id} companySize`;
  }
}
