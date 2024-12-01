import { Type } from 'class-transformer';
import { PropertyType, RentalPeriod} from '@prisma/client';
import { IsOptional, IsEnum, IsBoolean, IsString, IsInt, Min, IsNumber } from 'class-validator';


export class FilterRealEstateDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsEnum(PropertyType)
  property_type?: PropertyType;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  max_occupants?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxPrice?: number;

  @IsOptional()
  @IsEnum(RentalPeriod)
  rentalPeriod?: RentalPeriod;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isFurnished?: boolean;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isServicesIncluded?: boolean;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  limit: number = 10;
}