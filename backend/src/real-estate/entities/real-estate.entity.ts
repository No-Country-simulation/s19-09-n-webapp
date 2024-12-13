import { OmitType } from "@nestjs/mapped-types";
import { Exclude, Transform, Type } from "class-transformer";
import { PropertyType, RentalPeriod, Room, Service, PropertyPhoto, NearLocation } from '@prisma/client';

import { UserWithoutPassword } from "src/user/entities";

export class RealEstateEntity {
  id: string;
  title: string;
  address: string;
  city: string;
  @Transform(({ value }) => value as PropertyType)
  property_type: PropertyType;
  max_occupants: number;
  @Type(() => Number )
  @Transform(({ value }) => value as number)
  payment_by_period: number;
  @Transform(({ value }) => value as RentalPeriod)
  min_rental_period: RentalPeriod;
  rooms?: Room[];
  services?: Service[];
  is_furnished: boolean;
  is_services_included: boolean;
  rating: number;
  is_active: boolean;
  is_available: boolean;
  created_at: Date;
  updated_at: Date;
  near_universities?: NearLocation[];
  photos?: PropertyPhoto[];
  user_id: string;
  user?: UserWithoutPassword;
}

export class RealEstateEntityWhitExclude extends OmitType(RealEstateEntity, ['updated_at', 'user_id']) {
  @Exclude()
  user_id: string
  @Exclude()
  updated_at: Date
}