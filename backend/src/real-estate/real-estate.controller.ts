import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res, UsePipes, ValidationPipe
} from '@nestjs/common';
import { Response } from 'express';

import { RealEstateService } from './real-estate.service'
import { FilterRealEstateDto } from './dto/filter-real-sate.dto';
import { CreateRealEstateDto, UpdateRealEstateDto } from './dto/create-real-estate.dto';

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProperties(@Query() filters: FilterRealEstateDto) {
    return this.realEstateService.getAllRealEstates(filters);
  }

  // TODO: Service to get property by ID
  @Get(':id')
  getProperty(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.OK).json({
      id,
    });
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

  // TODO: Service to delete a property
  @Delete('/delete/:id')
  deleteProperty(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.OK).send({});
  }
}
