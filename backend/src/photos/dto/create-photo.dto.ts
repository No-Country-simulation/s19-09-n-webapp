import { IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  photo: Express.Multer.File;
  @IsString()
  property_id: string;
}
