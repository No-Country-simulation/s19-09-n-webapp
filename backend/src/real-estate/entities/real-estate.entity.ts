import { OmitType } from "@nestjs/mapped-types";
import { Exclude, Transform } from "class-transformer";

import { PropertyOwner, PropertyPhoto } from "../types/real-estate.type";

// FIXME: Review all property needed fields and their types.
export class RealEstateProperty {
  id: string;
  title: string;
  address: string;
  city: string;
  @Transform(({ value }) => value as PropertyTypes)
  property_type: PropertyTypes;
  max_occupants: number;
  payment_by_period: number;
  @Transform(({ value }) => value as PropertyRentalPeriods)
  min_rental_period: PropertyRentalPeriods
  @Transform(({ value }) => value as PropertyRoms[])
  roms: PropertyRoms[];
  @Transform(({ value }) => value as PropertyServices[])
  services: PropertyServices[];
  is_furnished: boolean;
  is_services_included: boolean;
  rating: number;
  created_at: Date;
  updated_at: Date;
  near_university: boolean;
  photos: PropertyPhoto[];
}

export enum PropertyTypes {
  APARTMENT = 'APARTMENT',
  ROOM = 'ROOM',
  HOUSE = 'HOUSE',
}

export enum PropertyServices {
  INTERNET = 'INTERNET',
  WATER = 'WATER',
  CLEANING = 'CLEANING',
  WASHING_MACHINE = 'WASHING_MACHINE',
  AIR_CONDITIONER = 'AIR_CONDITIONER',
  HEATER = 'HEATER',
}

export enum PropertyRoms {
  BEDROOM = 'BEDROOM',
  KITCHEN = 'KITCHEN',
  LIVING = 'LIVING',
  DINNING = 'DINNING',
  LAUNDRY = 'LAUNDRY',
  STUDY = 'STUDY',
  GARAGE = 'GARAGE',
  BATHROOM = 'BATHROOM',
}

export enum PropertyRentalPeriods {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  TRIMESTERLY = 'TRIMESTERLY',
  HALF_YEARLY = 'HALF_YEARLY',
  YEARLY = 'YEARLY',
}