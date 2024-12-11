import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

enum OrderTypes {
  asc = 'asc',
  desc = 'desc',
}

enum UnivSortBy {
  name = 'name',
  city = 'city',
}

export class QueryUniversityDto {
  @ApiProperty({
    example: 'Buenos Aires',
    description: 'Must be the complete name',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;
  @ApiProperty({
    enum: OrderTypes,
    default: OrderTypes.asc,
    required: false,
  })
  @IsOptional()
  @IsIn(['asc', 'desc'])
  order_by: OrderTypes = OrderTypes.asc;
  @ApiProperty({
    enum: UnivSortBy,
    default: UnivSortBy.name,
    required: false,
  })
  @IsOptional()
  @IsIn(['name', 'city'])
  sort_by: 'name' | 'city' = 'name';
  @ApiProperty({
    example: 'bu',
    description: 'Search term',
    required: false,
  })
  @IsOptional()
  @MinLength(2)
  @MaxLength(18)
  s?: string;
  @ApiProperty({
    description: 'Determines if the item is active',
    default: true,
    required: false,
    type: Boolean,
  })
  @IsOptional()
  @Transform(({ value }) => {
    return value === 'true' ? true : false;
  })
  @IsBoolean()
  minimum?: boolean = true;
}
