import { IsString, Validate } from 'class-validator';
import { FileSize, IsImgType } from '../decorators/file-validators';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePhotoDto {
  @ApiProperty({ type: File })
  @Validate(IsImgType)
  @Validate(FileSize, [2])
  photo: Express.Multer.File;

  @ApiProperty()
  @IsString()
  property_id: string;
}

export class CreatePhotoDtoWithoutFile {
  @IsString()
  property_id: string;
}
