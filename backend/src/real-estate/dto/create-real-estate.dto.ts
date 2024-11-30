import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsBoolean, IsEnum } from 'class-validator';

import {
  PropertyRoms,
  PropertyTypes,
  PropertyServices,
  PropertyRentalPeriods,
} from '../entities/real-estate.entity';

export class CreateRealEstateDto {
  @ApiProperty({ example: 'title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Downing Street' })
  @IsString()
  address: string;

  @ApiProperty({ example: 'New York' })
  @IsString()
  city: string;

  @ApiProperty({ example: PropertyTypes.APARTMENT })
  @IsEnum(PropertyTypes)
  property_type: PropertyTypes;

  @ApiProperty({ example: 2 })
  @IsNumber()
  max_occupants: number;

  @ApiProperty({ example: 200 })
  @IsNumber()
  payment_by_period: number;

  @ApiProperty({ example: PropertyRentalPeriods.WEEKLY })
  @IsEnum(PropertyRentalPeriods)
  min_rental_period: PropertyRentalPeriods;

  @ApiProperty({ example: [PropertyRoms.BEDROOM, PropertyRoms.KITCHEN] })
  @IsArray()
  @IsEnum(PropertyRoms, { each: true })
  rooms: PropertyRoms[]

  @ApiProperty( { example: [PropertyServices.INTERNET, PropertyServices.WATER] })
  @IsArray()
  @IsEnum(PropertyServices, { each: true })
  services: PropertyServices[];

  @ApiProperty({ example: true })
  @IsBoolean()
  is_furnished: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_services_included: boolean;

  @ApiProperty({ example: 4 })
  @IsNumber()
  rating: number

  @ApiProperty({ example: 'location_id' })
  @IsString()
  location_id: string;

  // TODO: Create DTO for Near Universities
  @ApiProperty({ type: [String], example: [
    { distance: 23, property_id: 'property_id', university: [] },
  ]})
  @IsArray()
  near_universities: string[];

  // TODO: Create DTO for Photos of Property
  @ApiProperty()
  @IsArray()
  photos: string[];

  @ApiProperty({ example: 'user_id' })
  @IsString()
  user_id: string;
}