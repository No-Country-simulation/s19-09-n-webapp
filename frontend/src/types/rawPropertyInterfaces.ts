export interface PropertyToBackend {
  property_type: string;
  city: string;
  title: string;
  address: string;
  payment_by_period: number; //TODO: to modify
  min_rental_period: string;
  rooms: RoomItem[]; //TODO: to modify
  max_occupants: number; //TODO: to modify
  is_furnished: boolean;
  is_services_included: boolean;
  services?: ServiceItem[];
  near_universities: NearUniversity[];  //TODO: to modify
}

interface RoomItem {
  room_id: string;
}

interface ServiceItem {
  service_id: string;
}

interface NearUniversity {
  university_id: string;
  distance: number;
}

export interface RawProperty {
  property_type: string;
  city: string;
  title: string;
  address: string;
  payment_by_period: string;
  min_rental_period: string;
  rooms: string,
  bathrooms: string;
  nonEssential: string[];
  is_furnished: boolean;
  is_services_included: boolean;
  services?: ServiceItem[];
}