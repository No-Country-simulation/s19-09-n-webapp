import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City, PropertyType, RentalPeriod } from '@prisma/client';
import { IsString, IsNumber, IsBoolean, IsEnum, Length, IsNotEmpty, Min, Matches, IsOptional, Max, IsArray, ValidateNested } from 'class-validator';


export class AddServicesOnPropertyDto {
  @ApiProperty({ example: '359b7ae1-d394-4341-ab4a-a96c2c447513' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, { message: 'Invalid UUID format' })
  service_id: string
}

export class AddRoomsOnPropertyDto {
  @ApiProperty({ example: '359b7ae1-d394-4341-ab4a-a96c2c447513' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, { message: 'Invalid UUID format' })
  room_id: string
}

export class AddNearUniversityDto {
  @ApiProperty({ example: '359b7ae1-d394-4341-ab4a-a96c2c447513' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, { message: 'Invalid UUID format' })
  university_id: string

  @ApiProperty({ example: 350 })
  @IsNumber()
  @Min(0)
  distance: number
}


export class AddPropertyPhotoDto {
  @ApiProperty({ example: 'https://www.construyehogar.com/wp-content/uploads/2016/01/Frachada-principal-casa-moderna-madera.jpg' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(https?:\/\/)?([\w\-]+(\.[\w\-]+)+)(:[0-9]{1,5})?(\/[^\s?#]*)?(\?[^\s#]*)?(#[^\s]*)?$/, { message: 'Invalid URL format' })
  photo_url: string
}

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

  @ApiProperty({ enum: City ,example: City.BUENOS_AIRES })
  @IsString()
  @IsNotEmpty()
  city: City;

  @ApiProperty({ enum: PropertyType ,example: 'APARTMENT' })
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

  @ApiProperty({ enum: RentalPeriod, example: 'MONTHLY' })
  @IsEnum(RentalPeriod)
  min_rental_period: RentalPeriod;

  @ApiProperty({ type: [AddRoomsOnPropertyDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddRoomsOnPropertyDto)
  rooms: AddRoomsOnPropertyDto[];

  @ApiProperty({ type: [AddServicesOnPropertyDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddServicesOnPropertyDto)
  services: AddServicesOnPropertyDto[];

  @ApiProperty({ example: true })
  @IsBoolean()
  is_furnished: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  is_services_included: boolean;

  @ApiProperty({ type: [AddNearUniversityDto] })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddNearUniversityDto)
  near_universities: AddNearUniversityDto[];

  @ApiProperty({ type: [AddPropertyPhotoDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddPropertyPhotoDto)
  photos: AddPropertyPhotoDto[];
}

export class UpdateRealEstateDto extends CreateRealEstateDto {
  @ApiProperty({ example: 4, required: false })
  @IsNumber()
  @Min(0)
  @Max(5)
  @IsOptional()
  rating: number;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_active: boolean;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  is_available: boolean;
}