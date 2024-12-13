import { Validate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsImgType } from 'src/photos/decorators/file-validators';

export class UploadImageRealEstateDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  @Validate(IsImgType)
  photo: Express.Multer.File;
}
