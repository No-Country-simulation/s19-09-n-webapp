import { IsString, Validate } from 'class-validator';
import { FileSize, IsImgType } from '../decorators/file-validators';

export class CreatePhotoDto {
  @Validate(IsImgType)
  @Validate(FileSize, [2])
  photo: Express.Multer.File;
  @IsString()
  property_id: string;
}

export class CreatePhotoDtoWithoutFile {
  @IsString()
  property_id: string;
}
