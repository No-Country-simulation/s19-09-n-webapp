import { useFilters } from "./useFilters";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProperties } from "../services/propertiesService";

export function useProperties() {
  const {filters} = useFilters();
  const [page, setPage] = useState(1);

  const propertiesQuery = useQuery({
    queryKey: ["properties", {filters, page}],
    queryFn: () => getProperties(filters, page),
  });

  return {propertiesQuery, currentPage: page, updatePage: setPage};
}