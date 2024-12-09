export const filterLabels = {
  city: {
    label: "Provincia",
    cities: {
      Todas: undefined,
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
      Todas: undefined,
      Departamento: "APARTMENT",
      Casa: "HOUSE",
      Habitación: "ROOM",
    },
  },
  period: {
    label: "Estadía",
    periods: {
      Todas: undefined,
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
      Todos: undefined,
    },
  },
  hasServices: {
    label: "Con servicios:",
    values: {
      Sí: true,
      No: false,
      Todos: undefined,
    },
  },
  minPrice: { label: "Mín." },
  maxPrice: { label: "Máx." },
  maxOccupants: { label: "Núm. ocupantes ≤" },
  rating: { label: "Puntuación mínima:", ratings: [1, 2, 3, 4, 5] },
};