import { getUserRentals } from "../services/propertiesService";
import { useQuery } from "@tanstack/react-query";

export function useUserRentals(token: string) {

  const userRentalsQuery = useQuery({
    queryKey: ["userRentals"],
    queryFn: () => getUserRentals(token),
  });

  return {userRentalsQuery};
}