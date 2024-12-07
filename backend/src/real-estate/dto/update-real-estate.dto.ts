import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';

import { CreateRealEstateDto } from './create-real-estate.dto';

export class UpdateRealEstateDto extends PartialType(CreateRealEstateDto) {
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
}
