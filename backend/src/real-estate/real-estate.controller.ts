import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiAcceptedResponse, ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiResponse } from '@nestjs/swagger';

import { JwtGuardBearer } from 'src/auth/guards';
import { RealEstateService } from './real-estate.service';
import { CreateRealEstateDto, UpdateRealEstateDto } from './dto';
import { FilterRealEstateByUserIdDto, FilterRealEstateDto } from './dto/filter-real-sate.dto';

@Controller('real-estate')
export class RealEstateController {
  constructor(private readonly realEstateService: RealEstateService) { }

  // * Get all properties -----------------------------------------------------------------------------//
  @Get()
  @ApiResponse({ status: 200, description: 'Success', type: CreateRealEstateDto })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getAllProperties(@Query() filters: FilterRealEstateDto) {
    return this.realEstateService.getAllRealEstates(filters);
  }

  // * Get all my properties ---------------------------------------------------------------------------//
  @Get('/my-properties')
  @UseGuards(JwtGuardBearer)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success', type: [CreateRealEstateDto] })
  @ApiBadRequestResponse({ description: 'Bad request' })
  async getMyProperties(@Query() filter: FilterRealEstateByUserIdDto, @Req() req: any) {
    try {
      return this.realEstateService.GetPropertiesByUserID(filter, req.user.id);
    } catch (error) {
      throw new HttpException({
        name: error.name,
        code: error.code,
        message: error.meta?.cause || error.message,
      }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // * Get one property by id --------------------------------------------------------------------------//
  @Get(':id')
  @ApiResponse({ status: 200, description: 'Success', type: CreateRealEstateDto })
  @ApiNotFoundResponse({ description: 'Property not found or not exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  getProperty(@Param('id') id: string) {
    try {
      return this.realEstateService.GetRealEstateById(id);
    } catch (error) {
      throw new HttpException({
        name: error.name,
        code: error.code,
        message: error.meta?.cause || error.message,
      }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // * Create a new property --------------------------------------------------------------------------//
  @Post('/add')
  @UseGuards(JwtGuardBearer)
  @ApiBearerAuth()
  @ApiBody({ type: CreateRealEstateDto })
  @ApiCreatedResponse({ description: 'Property created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async createProperty(@Body() data: CreateRealEstateDto, @Req() req: any) {
    try {
      const property = await this.realEstateService.createRealEstateService(data, req.user.id);

      await Promise.all([
        this.realEstateService.addRoomsToRealEstateService(data.rooms || [], property.id),
        this.realEstateService.addPhotoToRealEstateService(data.photos || [], property.id),
        this.realEstateService.addServicesToRealEstateService(data.services || [], property.id),
        this.realEstateService.addNearUniversityToRealEstateService(data.near_universities || [], property.id),
      ])

    } catch (error) {
      throw new HttpException({
        name: error.name,
        code: error.code,
        message: error.meta?.cause || error.message,
      }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // * Update a property ---------------------------------------------------------------------------//
  @Patch('/update/:property_id')
  @UseGuards(JwtGuardBearer)
  @ApiBearerAuth()
  @ApiAcceptedResponse({ description: 'Property updated successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  /**
   * Updates a property.
   *
   * @param property_id The id of the property to be updated.
   * @param body The data to be updated.
   * @param req The request object.
   * @returns A promise that resolves to an object with a message property containing the confirmation message.
   * @throws An error if the update process fails.
   */
  async updateProperty(@Param('property_id') property_id: string, @Body() body: UpdateRealEstateDto, @Req() req: any) {
    try {
      this.realEstateService.updateRealEstateService(property_id, req.user.id, body);

      await Promise.all([
        this.realEstateService.addRoomsToRealEstateService(body.rooms || [], property_id),
        this.realEstateService.addPhotoToRealEstateService(body.photos || [], property_id),
        this.realEstateService.addServicesToRealEstateService(body.services || [], property_id),
        this.realEstateService.addNearUniversityToRealEstateService(body.near_universities || [], property_id),
      ])

      return { message: 'Property updated successfully' };
    } catch (error) {
      return new HttpException({
        name: error.name,
        code: error.code,
        message: error.meta?.cause || error.message,
      }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // * Delete a property ---------------------------------------------------------------------------//
  @Delete('/delete/:property_id')
  @UseGuards(JwtGuardBearer)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Deleted successfully' })
  @ApiNotFoundResponse({ description: 'Property not found or not exists' })
  deleteProperty(@Param('property_id') property_id: string, @Req() req: any) {
    try {
      return this.realEstateService.deleteRealEstate(property_id, req.user.id);
    } catch (error) {
      return new HttpException({
        name: error.name,
        code: error.code,
        message: error.meta?.cause || error.message,
      }, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
