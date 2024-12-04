import { IsString, Validate } from 'class-validator';
import { FileSize, IsImgType } from '../decorators/file-validators';

export class CreatePhotoDto {
  @Validate(IsImgType)
  @Validate(FileSize, [2])
  file: Express.Multer.File;
  @IsString()
  property_id: string;
}
