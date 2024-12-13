import { Exclude, Transform, Type } from 'class-transformer';
import Decimal from 'decimal.js';

export class ReturnUniversityDto {
  id: string;
  name: string;
  city: string;
  country: string;
  address?: string;
  image_url?: string;
  @Transform(
    ({ value }) => (value != null ? new Decimal(value).toNumber() : null),
    {
      toClassOnly: true,
    },
  )
  @Type(() => Number)
  latitude?: number;
  @Transform(
    ({ value }) => (value != null ? new Decimal(value).toNumber() : null),
    {
      toClassOnly: true,
    },
  )
  @Type(() => Number)
  longitude?: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;
  // near_properties Property;
}

export class ReturnUniversityMinDto {
  id: string;
  name: string;
}
