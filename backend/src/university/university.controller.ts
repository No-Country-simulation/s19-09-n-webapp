import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UniversityService } from './university.service';
import { QueryUniversityDto } from './dto/query-university.dto';
import { CreateUniversityDto } from './dto/create-university.dto';

@Controller('univ')
@ApiTags('University')
export class UniversityController {
  constructor(private readonly univService: UniversityService) {}

  @Get()
  async getAllUniversities(@Query() data: QueryUniversityDto) {
    return await this.univService.findAllUniversities(data);
  }

  @Post()
  async registerUniversity(@Body() createDto: CreateUniversityDto) {
    return await this.univService.storeNewUniversity(createDto);
  }
  @Get('cities')
  @ApiParam({ name: 'country', required: false })
  async getCitiesList(@Query('country') country: string) {
    return await this.univService.findCitiesList(country);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async getById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.univService.getById(id);
  }
}
