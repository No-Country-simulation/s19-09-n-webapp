import { getUserProperties } from "../services/propertiesService";
import { useQuery } from "@tanstack/react-query";

export function useUserProperties() {

  const userPropertiesQuery = useQuery({
    queryKey: ["userProperties"],
    queryFn: () => getUserProperties(),
  });

  return {userPropertiesQuery};
}