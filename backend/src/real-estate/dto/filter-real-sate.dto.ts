import {
  IsOptional,
  IsEnum,
  IsBoolean,
  IsString,
  IsInt,
  Min,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { City, PropertyType, RentalPeriod } from '@prisma/client';

export class FilterRealEstateByUserIdDto {
  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @ApiProperty({ example: 10, required: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit: number = 10;
}

export class FilterRealEstateDto extends PartialType(
  FilterRealEstateByUserIdDto,
) {
  @ApiProperty({ example: City.BUENOS_AIRES, required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: PropertyType.APARTMENT, required: false })
  @IsOptional()
  @IsEnum(PropertyType)
  property_type?: PropertyType;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  max_occupants?: number;

  @ApiProperty({ example: 3000.0, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rating?: number;

  @ApiProperty({ example: 5000.0, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPrice?: number;

  @ApiProperty({ example: RentalPeriod.MONTHLY, required: false })
  @IsOptional()
  @IsEnum(RentalPeriod)
  rentalPeriod?: RentalPeriod;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isFurnished?: boolean;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isServicesIncluded?: boolean;
}
