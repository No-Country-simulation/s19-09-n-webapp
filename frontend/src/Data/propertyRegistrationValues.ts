export const propertyRegistrationValues: PropertyRegistrationValues = {
  property_type: {
    label: "Categoría",
    values: {
      Departamento: "APARTMENT",
      Casa: "HOUSE",
      Habitación: "ROOM",
    },
  },
  city: {
    label: "Ciudad",
    values: {
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
  title: { label: "Título" },
  address: { label: "Dirección" },
  payment_by_period: { label: "$ estadía mínima (ARS)" },
  min_rental_period: {
    label: "Estadía mínima",
    values: {
      Semanal: "WEEKLY",
      Mensual: "MONTHLY",
      Trimestral: "TRIMESTERLY",
      Semestral: "HALF_YEARLY",
      Anual: "YEARLY",
    },
  },
  max_occupants: { label: "Máx. ocupantes" },
  spaces: {
    label: "Espacios",
    space: {
      room: {
        label: "Habitaciones",
        values: {
          "1": "22f1e7ce-178f-447e-8991-476412c574a2",
          "2": "0ed7846e-ba38-436f-b12b-0ef99a3d9351",
          "3": "b24b6999-1c15-450d-9e93-5b1eeea18723",
        },
      },
      bathroom: {
        label: "Baños",
        values: {
          "1": "63ff5892-8126-4c6c-a8dd-14960da90b06",
          "2": "7ee8868e-16de-4f70-92da-39b3c1f1383a",
          "3": "f3b48809-b30d-4df7-8dd1-754794691d8e",
        },
      },
      nonEssential: {
        Cocina: "df420ace-30ba-4c0b-aa2e-bc9889cc0967",
        Comedor: "701bade0-a8a3-497c-a6d0-6ea708bdd4e7",
        Estudio: "b9ac63b0-ee6e-4ac2-8bdd-e18ee34ebc66",
        Garage: "e35654e4-e33f-49ee-8902-5af47be3a219",
        "Sala de estar": "79e4bd3a-c4de-40c0-bfb3-a8a01384e26b",
        "Área de lavado": "b6309a39-4efa-42e0-b287-edb5c208963c",
      },
    },
  },
  is_furnished: { label: "Amueblado",},
  is_services_included: {
    label: "Con servicios",
  },
  services: {
    label: "Servicios",
    values: {
      Internet: "INTERNET",
      Agua: "WATER",
      Gas: "HEATER",
      Aseo: "CLEANING",
      Lavado: "WASHING_MACHINE",
      "A/C": "AIR_CONDITIONER",
    },
  },
  near_universities: {
    label: "Universidades cercanas",
    values: {
      "BUENOS_AIRES": [
        "f9306c3c-c5c6-44b4-9eb3-83ebc1dbbb8d",
        "89d7f27c-5ab1-4f23-9ee8-19bbf3d8c503",
        "d4a6afc5-b04e-4e54-9dc5-78d6f7b55f92",
        "e72f63d3-0bfc-4ad8-a63b-64d20d2d6ea1",
      ],
      CHACO: [
        "89d7f27c-5ab1-4f23-9ee8-19bbf3d8c503",
        "efb93af0-5f71-44de-a86c-9f6c9d7513db",
        "128b7d0f-f3d7-4700-95ed-7e1b0de3a8d1",
      ],
      CORDOBA: [
        "d84e7bd3-3449-4ab2-931b-979c6dbbe793",
        "89d7f27c-5ab1-4f23-9ee8-19bbf3d8c503",
      ],
      JUJUY: [
        "89d7f27c-5ab1-4f23-9ee8-19bbf3d8c503",
        "d4a6afc5-b04e-4e54-9dc5-78d6f7b55f92",
        "ce5d3b7e-5c16-45d7-9f70-2fbde7c61a29",
      ],
      "LA_RIOJA": [
        "f49a86e5-cd4a-4cc5-9f33-b5d9c3c21e71",
        "95a48339-c362-4e2e-bc5a-1dcd355cd062",
      ],
      MENDOZA: [
        "f9306c3c-c5c6-44b4-9eb3-83ebc1dbbb8d",
        "84d1d9ea-cc45-40fa-bb65-4e587f5e9929",
        "89d7f27c-5ab1-4f23-9ee8-19bbf3d8c503",
        "22d35fa2-b891-40f1-8b39-679042fef3b3",
        "3ab8c565-3c91-4c94-a90c-dfdb682aec98",
      ],
      MISIONES: [
        "89d7f27c-5ab1-4f23-9ee8-19bbf3d8c503",
        "3c2c9cfb-e30a-4c71-82cc-49b1bce0f7dc",
      ],
      SALTA: [
        "89d7f27c-5ab1-4f23-9ee8-19bbf3d8c503",
        "89d7f27c-5ab1-4f23-9ee8-19bbf3d8c503",
        "b3adbd8b-68c6-485e-a13d-2df4c2047be2",
      ],
      SAN_JUAN: [
        "84d1d9ea-cc45-40fa-bb65-4e587f5e9929",
        "b6d36e3b-6a2e-445e-b046-f0d7e4bde3ba",
      ],
      SAN_LUIS: [
        "84d1d9ea-cc45-40fa-bb65-4e587f5e9929",
        "89d7f27c-5ab1-4f23-9ee8-19bbf3d8c503",
        "27bfb16a-5e7b-41d1-83e5-d2c3c1fe1a5f",
        "4e53ac8d-91c3-4b3c-8f5b-0f4d1bfe2a84",
      ],
      TUCUMAN: [
        "89d7f27c-5ab1-4f23-9ee8-19bbf3d8c503",
        "4d68a9ec-c292-4a5b-9a3d-6a3f76a54e19",
        "74c3b378-fac7-408c-8d45-d7a9ff0d82ed",
      ],
    },
  },
};

interface PropertyRegistrationValues {
  property_type: {
    label: string;
    values: Record<string, string>;
  };
  city: {
    label: string;
    values: Record<string, string>;
  };
  title: { label: string };
  address: { label: string };
  payment_by_period: { label: string };
  min_rental_period: {
    label: string;
    values: Record<string, string>;
  };
  max_occupants: {label: string};
  spaces: {
    label: string,
    space: {
      room: {
        label: string,
        values: Record<string, string>,
      };
      bathroom: {
        label: string,
        values: Record<string, string>,
      };
      nonEssential: Record<string, string>;
    }
  }
  is_furnished: {label: string};
  is_services_included: {label: string};
  services: {label: string, values: Record<string, string>};
  near_universities: {label: string, values: Record<string, string[]>};
}