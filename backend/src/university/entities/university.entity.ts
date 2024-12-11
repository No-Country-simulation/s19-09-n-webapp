import { Property } from '@prisma/client';
import Decimal from 'decimal.js';

export class University {
  id: string;
  name: string;
  country: string;
  city: string;
  address: string;
  image_url: string;
  latitude: Decimal;
  longitude: Decimal;
  created_at: Date;
  updated_at: Date;
  near_properties?: Property[];
}

export enum Cities {
  CORDOBA = 'Cordoba',
  BUENOS_AIRES = 'Buenos Aires',
  MENDOZA = 'Mendoza',
  SALTA = 'Salta',
  TUCUMAN = 'Tucumán',
  JUJUY = 'Jujuy',
  CHACO = 'Chaco',
  MISIONES = 'Misiones',
  LA_RIOJA = 'La Rioja',
  SAN_JUAN = 'San Juan',
  SAN_LUIS = 'San Luis',
}
