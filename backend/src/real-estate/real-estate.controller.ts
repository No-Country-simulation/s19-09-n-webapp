import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  FilterRealEstateByUserIdDto,
  FilterRealEstateDto,
} from './dto/filter-real-sate.dto';
import { JwtGuardBearer } from 'src/auth/guards';
import { PhotosService } from 'src/photos/photos.service';
import { RealEstateService } from './real-estate.service';
import { CreateRealEstateDto, UpdateRealEstateDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePhotoDto } from 'src/photos/dto/create-photo.dto';

@Controller('real-estate')
export class RealEstateController {
  constructor(
    private readonly realEstateService: RealEstateService,
    private readonly PhotosService: PhotosService,
  ) {}

  // * Get all properties -----------------------------------------------------------------------------//
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateRealEstateDto,
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getAllProperties(@Query() filters: FilterRealEstateDto) {
    try {
      return this.realEstateService.getAllRealEstates(filters);
    } catch (error) {
      throw new HttpException(
        {
          name: error.name,
          code: error.code,
          message: error.meta?.cause || error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // * Get all my properties ---------------------------------------------------------------------------//
  @Get('/my-properties')
  @UseGuards(JwtGuardBearer)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [CreateRealEstateDto],
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async getMyProperties(
    @Query() filter: FilterRealEstateByUserIdDto,
    @Req() req: any,
  ) {
    try {
      return this.realEstateService.GetPropertiesByUserID(filter, req.user.id);
    } catch (error) {
      throw new HttpException(
        {
          name: error.name,
          code: error.code,
          message: error.meta?.cause || error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // * Get one property by id --------------------------------------------------------------------------//
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreateRealEstateDto,
  })
  @ApiNotFoundResponse({ description: 'Property not found or not exists' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  getProperty(@Param('id') id: string) {
    try {
      return this.realEstateService.GetRealEstateById(id);
    } catch (error) {
      throw new HttpException(
        {
          name: error.name,
          code: error.code,
          message: error.meta || error.meta?.cause || error.message,
          stack: error.stack,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // * Create a new property --------------------------------------------------------------------------//
  @Post('/create')
  @UseGuards(JwtGuardBearer)
  @ApiBearerAuth()
  @ApiBody({ type: CreateRealEstateDto })
  @ApiCreatedResponse({ description: 'Property created successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createProperty(@Body() data: CreateRealEstateDto, @Req() req: any) {
    try {
      await this.realEstateService.createRealEstateService(data, req.user.id);
      return { message: 'Property created successfully' };
    } catch (error) {
      throw new HttpException(
        {
          name: error.name,
          code: error.code,
          message: error.meta || error.meta?.cause || error.message,
          stack: error.stack,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // * Add a photo to a property --------------------------------------------------------------------------//
  @Post('/:property_id/uploads')
  @ApiBearerAuth()
  @ApiBody({ type: CreatePhotoDto })
  @ApiCreatedResponse({ description: 'Photo uploaded successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @UseGuards(JwtGuardBearer)
  @UseInterceptors(FileInterceptor('file'))
  uploadPhotoOnProperty(
    @UploadedFile() file: Express.Multer.File,
    @Param('property_id') property_id: string,
  ) {
    try {
      this.PhotosService.create({ photo: file, property_id });

      return { message: 'Photo uploaded successfully' };
    } catch (error) {
      throw new HttpException(
        {
          name: error.name,
          code: error.code,
          message: error.meta || error.meta?.cause || error.message,
          stack: error.stack,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // * Update a property ---------------------------------------------------------------------------//
  @Patch('/update/:property_id')
  @UseGuards(JwtGuardBearer)
  @ApiBearerAuth()
  @ApiAcceptedResponse({ description: 'Property updated successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Property not found or not exists' })
  async updateProperty(
    @Param('property_id') property_id: string,
    @Body() body: UpdateRealEstateDto,
    @Req() req: any,
  ) {
    try {
      await this.realEstateService.updateRealEstateService(
        property_id,
        req.user.id,
        body,
      );

      return { message: 'Property updated successfully' };
    } catch (error) {
      throw new HttpException(
        {
          name: error.name,
          code: error.code,
          message: error.meta || error.meta?.cause || error.message,
          stack: error.stack,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete-photo/:photo_id')
  @UseGuards(JwtGuardBearer)
  @ApiBearerAuth()
  @ApiAcceptedResponse({ description: 'Photo deleted successfully' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiNotFoundResponse({ description: 'Photo not found or not exists' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  deletePhoto(@Param('photo_id') photo_id: string) {
    try {
      this.PhotosService.remove(photo_id);
    } catch (error) {
      throw new HttpException(
        {
          name: error.name,
          code: error.code,
          message: error.meta?.cause || error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      throw new HttpException(
        {
          name: error.name,
          code: error.code,
          message: error.meta?.cause || error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
