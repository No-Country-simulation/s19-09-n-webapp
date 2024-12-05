import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { City, PropertyType, RentalPeriod } from "@prisma/client";
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Max, Min, ValidateNested } from "class-validator";

import { AddPropertyPhotoDto, AddRoomsOnPropertyDto, AddNearUniversityDto, AddServicesOnPropertyDto } from "./create-real-estate.dto";


export class UpdateRealEstateDto {
  @ApiProperty({ example: 'title', required: false })
  @IsString()
  @IsOptional()
  @Length(1, 255)
  title: string;

  @ApiProperty({ example: 'Downing Street', required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Length(1, 255)
  address: string;

  @ApiProperty({ enum: City, example: City.BUENOS_AIRES, required: false })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  city: City;

  @ApiProperty({ enum: PropertyType, example: 'APARTMENT', required: false })
  @IsEnum(PropertyType)
  @IsOptional()
  property_type: PropertyType;

  @ApiProperty({ example: 2, required: false })
  @IsNumber()
  @Min(1)
  @IsOptional()
  max_occupants: number;

  @ApiProperty({ example: 145.50, required: false })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @IsOptional()
  payment_by_period: number;

  @ApiProperty({ enum: RentalPeriod, example: 'MONTHLY', required: false })
  @IsEnum(RentalPeriod)
  @IsOptional()
  min_rental_period: RentalPeriod;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_furnished: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_services_included: boolean;


  @ApiProperty({ example: 4, required: false })
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  rating: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_available: boolean;

  @ApiProperty({ type: [AddRoomsOnPropertyDto], required: false })
  @IsArray()
  @IsOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddRoomsOnPropertyDto)
  rooms: AddRoomsOnPropertyDto[];

  @ApiProperty({ type: [AddServicesOnPropertyDto], required: false })
  @IsArray()
  @IsOptional()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddServicesOnPropertyDto)
  services: AddServicesOnPropertyDto[];

  @ApiProperty({ type: [AddNearUniversityDto], required: false })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddNearUniversityDto)
  near_universities: AddNearUniversityDto[];

  @ApiProperty({ type: [AddPropertyPhotoDto], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddPropertyPhotoDto)
  photos: AddPropertyPhotoDto[];
}