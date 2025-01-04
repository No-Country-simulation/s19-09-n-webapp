import { useQuery } from "@tanstack/react-query";
import { getAllRoomTypes } from "../services/roomTypesService";

export function useRoomTypes() {
  const roomTypes = useQuery({
    queryKey: ["roomTypes"],
    queryFn: () => getAllRoomTypes(),
  });

  return { roomTypes };
}
