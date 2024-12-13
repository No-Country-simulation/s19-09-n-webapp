import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoomTypesService } from './room-types.service';

@Controller('room-types')
@ApiTags('RoomTypes')
export class RoomTypesController {
  constructor(private readonly service: RoomTypesService) {}

  @Get('/')
  async getAll() {
    return await this.service.findAll();
  }
}
