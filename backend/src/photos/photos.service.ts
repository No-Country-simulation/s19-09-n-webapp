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
      const cloudResponse = await this.cloudinary.uploadImage(
        createPhotoDto.file,
      );

      if (isApiResponse(cloudResponse)) {
        const dbResponse = await this.prisma.propertyPhoto.create({
          data: {
            photo_url: cloudResponse.secure_url,
            photo_service_id: cloudResponse.public_id,
            property_id: createPhotoDto.property_id,
          },
        });
        return dbResponse
          ? plainToInstance(Photo, dbResponse, {
              excludeExtraneousValues: true,
            })
          : null;
      }
      return null;
    } catch (error) {
      console.log(error);
      return 'No se pudo subir la imagen';
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
      return 'Error al buscar la foto';
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
      return 'Error al buscar la foto';
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
