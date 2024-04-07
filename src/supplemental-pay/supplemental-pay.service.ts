import { Injectable } from '@nestjs/common';
import { CreateSupplementalPayDto } from './dto/create-supplemental-pay.dto';
import { UpdateSupplementalPayDto } from './dto/update-supplemental-pay.dto';

@Injectable()
export class SupplementalPayService {
  create(createSupplementalPayDto: CreateSupplementalPayDto) {
    return 'This action adds a new supplementalPay';
  }

  findAll() {
    return `This action returns all supplementalPay`;
  }

  findOne(id: number) {
    return `This action returns a #${id} supplementalPay`;
  }

  update(id: number, updateSupplementalPayDto: UpdateSupplementalPayDto) {
    return `This action updates a #${id} supplementalPay`;
  }

  remove(id: number) {
    return `This action removes a #${id} supplementalPay`;
  }
}
