import { Injectable } from '@nestjs/common';
import { CreateOfficeLocationDto } from './dto/create-office_location.dto';
import { UpdateOfficeLocationDto } from './dto/update-office_location.dto';

@Injectable()
export class OfficeLocationService {
  create(createOfficeLocationDto: CreateOfficeLocationDto) {
    return 'This action adds a new officeLocation';
  }

  findAll() {
    return `This action returns all officeLocation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} officeLocation`;
  }

  update(id: number, updateOfficeLocationDto: UpdateOfficeLocationDto) {
    return `This action updates a #${id} officeLocation`;
  }

  remove(id: number) {
    return `This action removes a #${id} officeLocation`;
  }
}
