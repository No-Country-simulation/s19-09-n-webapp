import { Controller, Get } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('service')
@ApiTags('Services')
export class ServicesController {
  constructor(private readonly service: ServicesService) {}

  @Get('/')
  async getAll() {
    return await this.service.findAll();
  }
}
