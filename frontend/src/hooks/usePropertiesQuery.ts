import { getProperties } from "../services/propertiesService";
import { useFiltersStore } from "../store/filtersStore";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function usePropertiesQuery() {
  const filters = useFiltersStore(state => state.filters);
  const [page, setPage] = useState(1);

  const propertiesQuery = useQuery({
    queryKey: ["properties", {filters, page}],
    queryFn: () => getProperties(filters, page),
  });

  return {propertiesQuery, currentPage: page, updatePage: setPage};
}