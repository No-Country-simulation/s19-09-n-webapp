import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsISO31661Alpha2,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import Decimal from 'decimal.js';

export class CreateUniversityDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @MinLength(2)
  name: string;
  @ApiProperty({ example: 'AR', description: 'ISO31661Alpha2' })
  @IsISO31661Alpha2()
  @IsOptional()
  country: string;
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @MinLength(2)
  city: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(255)
  @MinLength(2)
  address?: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(512)
  @MinLength(2)
  image_url?: string;
  @ApiProperty({ required: false, example: 0.598631 })
  @IsOptional()
  @Transform(({ value }) => new Decimal(value))
  latitude?: Decimal;
  @ApiProperty({ required: false, example: -77.832755 })
  @IsOptional()
  @Transform(({ value }) => new Decimal(value))
  longitude?: Decimal;
}
