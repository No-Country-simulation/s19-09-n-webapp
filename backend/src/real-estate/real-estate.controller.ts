import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiResponse } from '@nestjs/swagger';

import { RealEstateService } from './real-estate.service'
import { CreateRealEstateDto, UpdateRealEstateDto } from './dto';
import { FilterRealEstateByUserIdDto, FilterRealEstateDto } from './dto/filter-real-sate.dto';
import { RealEstateEntityWhitExclude } from './entities';

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getAllProperties(@Query() filters: FilterRealEstateDto) {
    return this.realEstateService.getAllRealEstates(filters);
  }


  @Get('/my-properties')
  @ApiResponse({ status: 200, description: 'Success' })
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

  @Post('/add')
  @ApiBody({ type: CreateRealEstateDto })
  @ApiCreatedResponse({ description: 'Property created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async createProperty(@Body() data: CreateRealEstateDto) {
    try {
      const property = await this.realEstateService.createRealEstateService(data)

      await Promise.all([
        this.realEstateService.addRoomsToRealEstateService(data.rooms || [], property.id),
        this.realEstateService.addPhotoToRealEstateService(data.photos || [], property.id),
        this.realEstateService.addServicesToRealEstateService(data.services || [], property.id),
        this.realEstateService.addNearUniversityToRealEstateService(data.near_universities || [], property.id),
      ])

    } catch (error) {
      return new HttpException({
        name: error.name,
        code: error.code,
        message: error.meta ? error.meta?.cause : error.message,
        stack: error.stack
      }, error.status);
    }
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
