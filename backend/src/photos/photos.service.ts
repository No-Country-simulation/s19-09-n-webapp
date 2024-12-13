import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaClient } from '@prisma/client';
import { isApiResponse } from 'src/common';
import { plainToInstance } from 'class-transformer';
import { Photo } from './entities';

@Injectable()
export class PhotosService {
  constructor(
    private cloudinary: CloudinaryService,
    private prisma: PrismaClient,
  ) {}
  async create(createPhotoDto: CreatePhotoDto) {
    try {
      const existsPropertyId = await this.prisma.property.findFirst({
        where: { id: createPhotoDto.property_id },
      });
      if (existsPropertyId) {
        const cloudResponse = await this.cloudinary.uploadImage(
          createPhotoDto.photo,
        );

        if (isApiResponse(cloudResponse)) {
          const dbResponse = await this.prisma.propertyPhoto.create({
            data: {
              photo_url: cloudResponse.secure_url,
              photo_service_id: cloudResponse.public_id,
              property_id: createPhotoDto.property_id,
            },
          });
          if (dbResponse) {
            return plainToInstance(Photo, dbResponse, {
              excludeExtraneousValues: true,
            });
          }
          //Delete photo on the cloud
          await this.cloudinary.deleteImage(cloudResponse.public_id);
          return Error('Error al crear una foto en la db');
        }
      }
      throw Error('Id de propiedad invalido o inexistente');
    } catch (error) {
      console.log(error);
    }
  }

  async findAllByProperty(propertyId: string) {
    try {
      const dbResponse = await this.prisma.propertyPhoto.findMany({
        where: { property_id: propertyId },
      });
      return dbResponse ? plainToInstance(Photo, dbResponse) : null;
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      const dbResponse = await this.prisma.propertyPhoto.findFirst({
        where: { id: id },
      });
      return dbResponse ? plainToInstance(Photo, dbResponse) : null;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string) {
    try {
      const cloudResponse = await this.cloudinary.deleteImage(id);
      if (cloudResponse) {
        const dbResponse = await this.prisma.propertyPhoto.delete({
          where: { id: id },
        });
        return !!dbResponse;
      }
      throw Error('Error al eliminar en el cloud');
    } catch (error) {
      console.log(error);
      return 'Error al eliminar la foto';
    }
  }
}
