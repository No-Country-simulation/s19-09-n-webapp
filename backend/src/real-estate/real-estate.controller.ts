import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req, Res } from '@nestjs/common';
import { Response } from 'express';

import { RealEstateService } from './real-estate.service'
import { CreateRealEstateDto } from './dto/create-real-estate.dto';

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) {}

  // REVIEW: Function and test to get all properties with pagination.
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProperties(page: number, limit: number) {
    return this.realEstateService.getAllRealEstates(page, limit);
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
  createProperty(@Body() dto: CreateRealEstateDto) {
    return dto;
  }

  // TODO: Service to update a property
  @Put('/update/:id')
  updateProperty(@Param('id') id: string, @Req() req: Request, @Res() res: Response) {
    res.status(HttpStatus.OK).json({});
  }

  // TODO: Service to delete a property
  @Delete('/delete/:id')
  deleteProperty(@Param('id') id: string, @Res() res: Response) {
    res.status(HttpStatus.OK).send({});
  }
}
