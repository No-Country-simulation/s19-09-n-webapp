import { useSearchParams } from "react-router-dom";
import { FiltersInterface } from "../types/filtersInterface";
import { useCallback } from "react";

export function useFilters() {
  const [params, setParams] = useSearchParams();

  const filters = {
    city: params.get("city")
      ? (params.get("city") as FiltersInterface["city"])
      : "",
    property_type: params.get("property_type")
      ? (params.get("property_type") as FiltersInterface["property_type"])
      : "",
    rentalPeriod: params.get("rentalPeriod")
      ? (params.get("rentalPeriod") as FiltersInterface["rentalPeriod"])
      : "",
    isFurnished:
      params.get("isFurnished") === "true"
        ? true
        : params.get("isFurnished") === "false"
          ? false
          : "",
    isServicesIncluded:
      params.get("isServicesIncluded") === "true"
        ? true
        : params.get("isServicesIncluded") === "false"
          ? false
          : "",
    minPrice: params.get("minPrice")
      ? parseInt(params.get("minPrice") as string)
      : "",
    maxPrice: params.get("maxPrice")
      ? parseInt(params.get("maxPrice") as string)
      : "",
    max_occupants: params.get("max_occupants")
      ? parseInt(params.get("max_occupants") as string)
      : "",
    rating: params.get("rating")
      ? parseInt(params.get("rating") as string)
      : "",
  };

  const updateFilters = useCallback((filters: FiltersInterface) => {
    const newParams = new URLSearchParams();
      for (const [key, value] of Object.entries(filters)) {
        if (value !== undefined && value !== null && value !== "" && value !== 0) newParams.set(key, value);
      }
      setParams(newParams);
  }, [setParams]);

  const resetFilters = useCallback(() => {
    const emptyParams = new URLSearchParams();
    setParams(emptyParams);
    }, [setParams]);

  return {params, filters, updateFilters, resetFilters};
}
