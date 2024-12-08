export interface FiltersInterface {
  city?:
    | "BUENOS_AIRES"
    | "CHACO"
    | "CORDOBA"
    | "JUJUY"
    | "LA_RIOJA"
    | "MENDOZA"
    | "MISIONES"
    | "SALTA"
    | "SAN_JUAN"
    | "SAN_LUIS"
    | "TUCUMAN";
  property_type?: "APARTMENT" | "HOUSE" | "ROOM";
  rentalPeriod?:
    | "WEEKLY"
    | "MONTHLY"
    | "TRIMESTERLY"
    | "HALF_YEARLY"
    | "YEARLY";
  isFurnished?: boolean;
  isServicesIncluded?: boolean;
  minPrice?: number;
  maxPrice?: number;
  max_occupants?: number;
  rating?: number;
}
