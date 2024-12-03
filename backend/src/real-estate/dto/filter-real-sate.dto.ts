import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PropertyType, RentalPeriod } from '@prisma/client';
import { IsOptional, IsEnum, IsBoolean, IsString, IsInt, Min, IsNumber, IsNotEmpty } from 'class-validator';


export class FilterRealEstateDto {
  @ApiProperty({ example: 'BUENOS_AIRES', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({ example: 'ROOM', required: false })
  @IsOptional()
  @IsEnum(PropertyType)
  property_type?: PropertyType;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  max_occupants?: number;

  @ApiProperty({ example: 3000.00, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number;

  @ApiProperty({ example: 0, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rating?: number;

  @ApiProperty({ example: 5000.00, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPrice?: number;

  @ApiProperty({ example: 'MONTHLY', required: false })
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


export class FilterRealEstateByUserIdDto {
  @ApiProperty({ example: '359b7ae1-d394-4341-ab4a-a96c2c447513' })
  @IsString()
  @IsNotEmpty()
  id: string;

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