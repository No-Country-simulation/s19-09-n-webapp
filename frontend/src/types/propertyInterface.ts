export interface FrontendProperty {
  id: string;
  title: string;
  address: string;
  city: string;
  property_type: string;
  max_occupants: number;
  payment_by_period: number;
  min_rental_period: string;
  is_furnished: boolean;
  is_services_included: boolean;
  rating: number;
  is_active: boolean;
  is_available: boolean;
  user: User;
  rooms: number;
  bathrooms: number;
  services?: string[];
  photos: string[];
  near_universities?: NearUniversity[];
}

export interface User {
  name: string;
  last_name: string;
  email: string;
}

export interface NearUniversity {
  distance:   number;
  university: University;
}

export interface University {
  name: string;
}

export interface Property {
  id?: number,
  owner?: number,
  title?: string,
  description?: string,
  address?: string,
  city?: string,
  propertyType?: "house" | "apartment",
  maxOccupants?: number,
  roomsAvailable?: number,
  price?: number,
  furnished?: boolean,
  services?: boolean,
  imgUrl?: string,
}