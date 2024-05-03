import { Injectable } from '@nestjs/common';
import { CreateCompanySizeDto } from './dto/create-company_size.dto';
import { UpdateCompanySizeDto } from './dto/update-company_size.dto';

@Injectable()
export class CompanySizeService {
  create(createCompanySizeDto: CreateCompanySizeDto) {
    return 'This action adds a new companySize';
  }

  findAll() {
    return `This action returns all companySize`;
  }

  findOne(id: number) {
    return `This action returns a #${id} companySize`;
  }

  update(id: number, updateCompanySizeDto: UpdateCompanySizeDto) {
    return `This action updates a #${id} companySize`;
  }

  remove(id: number) {
    return `This action removes a #${id} companySize`;
  }
}
