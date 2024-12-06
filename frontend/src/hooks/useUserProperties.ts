import { getUserProperties } from "../services/propertiesService";
import { useQuery } from "@tanstack/react-query";

export function useUserProperties(token: string) {

  const userPropertiesQuery = useQuery({
    queryKey: ["userProperties"],
    queryFn: () => getUserProperties(token),
  });

  return {userPropertiesQuery};
}