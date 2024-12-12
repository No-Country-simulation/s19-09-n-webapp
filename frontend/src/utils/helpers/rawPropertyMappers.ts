import {propertyRegistrationValues} from "../../Data/propertyRegistrationValues";
import { PropertyToBackend, RawProperty } from "../../types/rawPropertyInterfaces";

export function mapRawPropertyToBackend(formFields: object) {
  const {spaces: {space: {room
}}, near_universities: universities} = propertyRegistrationValues;

  const rawProperty = formFields as RawProperty;

  const universityToBackend: PropertyToBackend = {
    ...rawProperty,
    payment_by_period: parseInt(rawProperty.payment_by_period),
    rooms: [
      { room_id: rawProperty.rooms },
      { room_id: rawProperty.bathrooms },
      ...rawProperty.nonEssential.map((id) => ({ room_id: id })),
    ],
    max_occupants: parseInt(
      Object.keys(room.values).find(
        (key: string) => room.values[key] === rawProperty.rooms
      ) ?? "1"
    ),
    services: rawProperty.is_services_included ? rawProperty.services : undefined,
    near_universities:
      universities.values[
        rawProperty.city].map((id: string) => ({
          university_id: id,
          distance: Math.floor(Math.random() * 10 + 1),
        })),
  };

  return universityToBackend;
}

export function mapBackendPropertyToEdit() {

}