export const propertyRegistrationValues = {
  title: { label: "Título" },
  address: { label: "Dirección" },
  city: {
    label: "Ciudad",
    values: {
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
  property_type: {
    label: "Categoría",
    values: {
      Departamento: "APARTMENT",
      Casa: "HOUSE",
      Habitación: "ROOM",
    },
  },
  max_occupants: {label: "Máx. ocupantes"},
  payment_by_period: {label: "$ estadía mínima (ARS)"},
  min_rental_period: {label: "Estadía mínima",
    values: {
      Semanal: "WEEKLY",
      Mensual: "MONTHLY",
      Trimestral: "TRIMESTERLY",
      Semestral: "HALF_YEARLY",
      Anual: "YEARLY",
    },
  },
  rooms: {label: "Dormitorios"}, //TODO: Preguntar 3 al back
  is_services_included: {label: "Con servicios",
    values: {"Sí": true, No: false,}
  },
  services: {label: "Servicios",
    values: {
      Internet: "INTERNET",
      Agua: "WATER",
      Gas: "HEATER",
      Aseo: "CLEANING",
      Lavado: "WASHING_MACHINE",
      "A/C": "AIR_CONDITIONER",
    }
  },
  is_furnished: {label: "Amueblado",
    values: {"Sí": true, No: false},
  },
  near_universities: {label: "Universidades cercanas"},
};
