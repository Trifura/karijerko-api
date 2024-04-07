import { Injectable } from '@nestjs/common';
import { CreateLocationTypeDto } from './dto/create-location-type.dto';
import { UpdateLocationTypeDto } from './dto/update-location-type.dto';

@Injectable()
export class LocationTypeService {
  create(createLocationTypeDto: CreateLocationTypeDto) {
    return 'This action adds a new locationType';
  }

  findAll() {
    return `This action returns all locationType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} locationType`;
  }

  update(id: number, updateLocationTypeDto: UpdateLocationTypeDto) {
    return `This action updates a #${id} locationType`;
  }

  remove(id: number) {
    return `This action removes a #${id} locationType`;
  }
}
