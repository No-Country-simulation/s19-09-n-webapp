import { ApiProperty } from '@nestjs/swagger';
import { PropertyType, RentalPeriod } from '@prisma/client';
import { IsString, IsNumber, IsBoolean, IsEnum, Length, IsNotEmpty, Min, Matches } from 'class-validator';

export class CreateRealEstateDto {
  @ApiProperty({ example: 'title' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  title: string;

  @ApiProperty({ example: 'Downing Street' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  address: string;

  @ApiProperty({ example: 'New York' })
  @IsString()
  @IsNotEmpty()
  @Length(1, 64)
  city: string;

  @ApiProperty({ example: 'APARTMENT' })
  @IsEnum(PropertyType)
  property_type: PropertyType;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  max_occupants: number;

  @ApiProperty({ example: 145.50 })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  payment_by_period: number;

  @ApiProperty({ example: 'WEEKLY' })
  @IsEnum(RentalPeriod)
  min_rental_period: RentalPeriod;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_furnished: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_services_included: boolean;

  @ApiProperty({ example: 'location_id', required: false })
  @IsString()
  @Matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, { message: 'Invalid UUID format' })
  location_id?: string;

  @ApiProperty({ example: 'user_id' })
  @IsString()
  @Matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, { message: 'Invalid UUID format' })
  user_id: string;
}

export class UpdateRealEstateDto extends CreateRealEstateDto {
  @ApiProperty({ example: 4.5 })
  @IsNumber({ maxDecimalPlaces: 1 })
  @Min(0)
  rating: number;
}