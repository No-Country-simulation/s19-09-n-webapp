import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photosService.create(createPhotoDto);
  }

  @Get('/property/:propertyId')
  findAll(@Param('propertyId') propertyId: string) {
    return this.photosService.findAllByProperty(propertyId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photosService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photosService.remove(id);
  }
}
