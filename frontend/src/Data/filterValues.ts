import { FiltersInterface } from "../types/filtersInterface";

export const emptyFilters: FiltersInterface = {
  city: "",
  property_type: "",
  rentalPeriod: "",
  isFurnished: "",
  isServicesIncluded: "",
  minPrice: "",
  maxPrice: "",
  max_occupants: "",
  rating: "",
}

export const filterLabels = {
  city: {
    label: "Provincia",
    cities: {
      Todas: "",
      "Buenos Aires": "BUENOS_AIRES",
      Chaco: "CHACO",
      Córdoba: "CORDOBA",
      Jujuy: "JUJUY",
      "La Rioja": "LA_RIOJA",
      Mendoza: "MENDOZA",
      Misiones: "MISIONES",
      Salta: "SALTA",
      "San Juan": "SAN_JUAN",
      "San Luis": "SAN_LUIS",
      Tucumán: "TUCUMAN",
    },
  },
  type: {
    label: "Categoría",
    types: {
      Todas: "",
      Departamento: "APARTMENT",
      Casa: "HOUSE",
      Habitación: "ROOM",
    },
  },
  period: {
    label: "Estadía",
    periods: {
      Todas: "",
      Semanal: "WEEKLY",
      Mensual: "MONTHLY",
      Trimestral: "TRIMESTERLY",
      Semestral: "HALF_YEARLY",
      Anual: "YEARLY",
    },
  },
  hasFurniture: {
    label: "Amueblado:",
    values: {
      Sí: true,
      No: false,
      Todos: "",
    },
  },
  hasServices: {
    label: "Con servicios:",
    values: {
      Sí: true,
      No: false,
      Todos: "",
    },
  },
  minPrice: { label: "Mín." },
  maxPrice: { label: "Máx." },
  maxOccupants: { label: "Núm. ocupantes ≤" },
  rating: { label: "Puntuación mínima:", ratings: [1, 2, 3, 4, 5] },
};