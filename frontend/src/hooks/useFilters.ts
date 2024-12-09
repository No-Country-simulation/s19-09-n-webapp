import { useSearchParams } from "react-router-dom";
import { FiltersInterface } from "../types/filtersInterface";
import { useCallback } from "react";

export function useFilters() {
  const [params, setParams] = useSearchParams();

  const filters = {
    city: params.get("city")
      ? (params.get("city") as FiltersInterface["city"])
      : undefined,
    property_type: params.get("property_type")
      ? (params.get("property_type") as FiltersInterface["property_type"])
      : undefined,
    rentalPeriod: params.get("rentalPeriod")
      ? (params.get("rentalPeriod") as FiltersInterface["rentalPeriod"])
      : undefined,
    isFurnished:
      params.get("isFurnished") === "true"
        ? true
        : params.get("isFurnished") === "false"
          ? false
          : undefined,
    isServicesIncluded:
      params.get("isServicesIncluded") === "true"
        ? true
        : params.get("isServicesIncluded") === "false"
          ? false
          : undefined,
    minPrice: params.get("minPrice")
      ? parseInt(params.get("minPrice") as string)
      : undefined,
    maxPrice: params.get("maxPrice")
      ? parseInt(params.get("maxPrice") as string)
      : undefined,
    max_occupants: params.get("max_occupants")
      ? parseInt(params.get("max_occupants") as string)
      : undefined,
    rating: params.get("rating")
      ? parseInt(params.get("rating") as string)
      : undefined,
  };

  const updateFilters = useCallback((filters: FiltersInterface) => {
    setParams((params) => {
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined) params.set(key, value);
      }
      return params;
    });
  }, [setParams]);

  return {filters, updateFilters};
}
