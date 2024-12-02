import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, Res, UsePipes, ValidationPipe
} from '@nestjs/common';
import { Response } from 'express';

import { RealEstateService } from './real-estate.service'
import { CreateRealEstateDto, UpdateRealEstateDto } from './dto/create-real-estate.dto';
import { FilterRealEstateByUserIdDto, FilterRealEstateDto } from './dto/filter-real-sate.dto';

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) { }

  @Get()
  async getAllProperties(@Query() filters: FilterRealEstateDto) {
    return this.realEstateService.getAllRealEstates(filters);
  }


  @Get('/my-properties/:id')
  async getMyProperties(@Query() id: FilterRealEstateByUserIdDto) {
    return this.realEstateService.GetPropertiesByUserID(id);
  }

  @Get(':id')
  getProperty(@Param('id') id: string) {
    return this.realEstateService.GetRealEstateById(id);
  }

  // TODO: Service to create a new entity of Property
  @Post('/add')
  @UsePipes(new ValidationPipe())
  createProperty(@Body() dto: CreateRealEstateDto) {
    return dto;
  }

  // TODO: Service to update a property
  @Patch('/update/:id')
  @UsePipes(new ValidationPipe())
  updateProperty(@Param('id') id: string, @Body() dto: UpdateRealEstateDto) {
    return dto;
  }


  @Delete('/delete/:id')
  deleteProperty(@Param('id') id: string, @Res() res: Response) {
    return this.realEstateService.deleteRealEstate(id);
  }
}
