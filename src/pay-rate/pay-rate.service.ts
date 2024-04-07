import { Injectable } from '@nestjs/common';
import { CreatePayRateDto } from './dto/create-pay-rate.dto';
import { UpdatePayRateDto } from './dto/update-pay-rate.dto';

@Injectable()
export class PayRateService {
  create(createPayRateDto: CreatePayRateDto) {
    return 'This action adds a new payRate';
  }

  findAll() {
    return `This action returns all payRate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payRate`;
  }

  update(id: number, updatePayRateDto: UpdatePayRateDto) {
    return `This action updates a #${id} payRate`;
  }

  remove(id: number) {
    return `This action removes a #${id} payRate`;
  }
}
