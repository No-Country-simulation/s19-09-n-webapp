export interface BackendProperty {
  id:                   string;
  title:                string;
  address:              string;
  city:                 string;
  property_type:        string;
  max_occupants:        number;
  payment_by_period:    number;
  min_rental_period:    string;
  is_furnished:         boolean;
  is_services_included: boolean;
  rating:               number;
  created_at:           Date;
  is_active:            boolean;
  is_available:         boolean;
  user:                 User;
  rooms:                RoomElement[];
  services:             ServiceElement[];
  photos:               Photo[];
  near_universities:    NearUniversity[];
}

export interface NearUniversity {
  distance:   number;
  university: University;
}

export interface University {
  name: string;
}

export interface Photo {
  id:               string;
  photo_url:        string;
  photo_service_id: string;
}

export interface RoomElement {
  room: RoomRoom;
}

export interface RoomRoom {
  type:     string;
  quantity: number;
}

export interface ServiceElement {
  service: ServiceService;
}

export interface ServiceService {
  type: string;
}

export interface User {
  name:      string;
  last_name: string;
  email:     string;
}
