export interface FiltersInterface {
  city?:
  | ""
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
  property_type?: "" | "APARTMENT" | "HOUSE" | "ROOM";
  rentalPeriod?:
  | ""
    | "WEEKLY"
    | "MONTHLY"
    | "TRIMESTERLY"
    | "HALF_YEARLY"
    | "YEARLY";
  isFurnished?: boolean | string;
  isServicesIncluded?: boolean | string;
  minPrice?: number | string;
  maxPrice?: number | string;
  max_occupants?: number | string;
  rating?: number | string;
}
