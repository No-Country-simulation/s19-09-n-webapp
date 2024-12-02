import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiResponse } from '@nestjs/swagger';

import { RealEstateService } from './real-estate.service'
import { CreateRealEstateDto, UpdateRealEstateDto } from './dto';
import { FilterRealEstateByUserIdDto, FilterRealEstateDto } from './dto/filter-real-sate.dto';

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Success', type: [FilterRealEstateDto] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getAllProperties(@Query() filters: FilterRealEstateDto) {
    return this.realEstateService.getAllRealEstates(filters);
  }


  @Get('/my-properties')
  @ApiResponse({ status: 200, description: 'Success', type: [FilterRealEstateDto] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getMyProperties(@Query() id: FilterRealEstateByUserIdDto) {
    return this.realEstateService.GetPropertiesByUserID(id);
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Property not found or not exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  getProperty(@Param('id') id: string) {
    return this.realEstateService.GetRealEstateById(id);
  }

  // TODO: Service to create a new entity of Property
  @Post('/add')
  @ApiCreatedResponse({ description: 'Property created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  createProperty(@Body() dto: CreateRealEstateDto) {
    return dto;
  }

  // TODO: Service to update a property
  @Patch('/update/:id')
  @ApiAcceptedResponse({ description: 'Property updated successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  updateProperty(@Param('id') id: string, @Body() dto: UpdateRealEstateDto) {
    return dto;
  }


  @Delete('/delete/:id')
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  @ApiNotFoundResponse({ description: 'Property not found or not exists' })
  deleteProperty(@Param('id') id: string) {
    return this.realEstateService.deleteRealEstate(id);
  }
}
