import { RoomElement, Photo, ServiceElement, BackendProperty } from "../../types/backendPropertyInterface";
import { FrontendProperty } from "../../types/propertyInterface";

export function mapProperty(backendProperty: BackendProperty): FrontendProperty {
  const frontendProperty: FrontendProperty = {
    id: backendProperty.id,
    title: backendProperty.title,
    address: backendProperty.address,
    city: backendProperty.city,
    property_type: backendProperty.property_type,
    max_occupants: backendProperty.max_occupants,
    payment_by_period: backendProperty.payment_by_period,
    min_rental_period: backendProperty.min_rental_period,
    is_furnished: backendProperty.is_furnished,
    is_services_included: backendProperty.is_services_included,
    rating: backendProperty.rating,
    is_active: backendProperty.is_active,
    is_available: backendProperty.is_available,
    user: backendProperty.user,
    rooms: backendProperty.rooms[backendProperty.rooms.findIndex((roomsObj: RoomElement) => roomsObj.room.type==="BEDROOM")].room.quantity,
    bathrooms: backendProperty.rooms[backendProperty.rooms.findIndex((roomsObj: RoomElement) => roomsObj.room.type==="BATHROOM")].room.quantity,
    services: backendProperty.services.map((serviceObj: ServiceElement) => serviceObj.service.type),
    photos: backendProperty.photos.map((photo: Photo) => photo.photo_url),
    near_universities: backendProperty.near_universities,
  };

  return frontendProperty;
}