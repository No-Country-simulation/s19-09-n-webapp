
import { useQuery } from "@tanstack/react-query";
import { getAllServicesTypes } from "../services/servicesTypesService";

export function useServicesTypes() {

  const servicesTypes = useQuery({
    queryKey: ["servicesTypes"],
    queryFn: () => getAllServicesTypes(),
  });

  return {servicesTypes};
}