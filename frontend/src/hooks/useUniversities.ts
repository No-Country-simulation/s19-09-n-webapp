import { useQuery } from "@tanstack/react-query";
import { getUniversitiesMin } from "../services/universitiesService";

export function useUniversities() {
  const universities = useQuery({
    queryKey: ["universities-all-min"],
    queryFn: () => getUniversitiesMin(),
  });

  return { universities };
}
