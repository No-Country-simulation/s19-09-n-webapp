import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyType, RentalPeriod } from '@prisma/client';
import { IsOptional, IsEnum, IsBoolean, IsString, IsInt, Min, IsNumber } from 'class-validator';


export class FilterRealEstateDto {
  @ApiProperty({ example: 'New York', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'APARTMENT', required: false })
  @IsOptional()
  @IsEnum(PropertyType)
  property_type?: PropertyType;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  max_occupants?: number;

  @ApiProperty({ example: 145.50, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number;

  @ApiProperty({ example: 215, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPrice?: number;

  @ApiProperty({ example: 'WEEKLY', required: false })
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

  @ApiProperty({ example: 2, required: false })
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