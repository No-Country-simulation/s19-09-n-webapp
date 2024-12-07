import { Module } from '@nestjs/common';
import { RealEstateController } from './real-estate.controller';
import { RealEstateService } from './real-estate.service';
import { PhotosModule } from 'src/photos/photos.module';
import { CloudinaryProvider } from 'src/cloudinary/cloudinary.provider';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [PhotosModule, CloudinaryModule],
  controllers: [RealEstateController],
  providers: [RealEstateService, CloudinaryProvider],
})
export class RealEstateModule {}
