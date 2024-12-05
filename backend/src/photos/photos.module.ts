import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [CloudinaryModule],
  controllers: [PhotosController],
  providers: [PhotosService, PrismaClient],
  exports: [PhotosService],
})
export class PhotosModule {}
