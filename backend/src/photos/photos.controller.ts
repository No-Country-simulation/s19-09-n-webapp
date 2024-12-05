import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  Body,
  UploadedFile,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePhotoDtoWithoutFile } from './dto/create-photo.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() createPhoto: CreatePhotoDtoWithoutFile,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    return this.photosService.create({
      property_id: createPhoto.property_id,
      photo: photo,
    });
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
