import { create } from 'zustand'

interface FiltersStore {
  filters: FiltersInterface,
}

export interface FiltersInterface {
  category?: "house" | "apartment",
  city?: string,
  hasServices?: boolean,
  hasFurniture?: boolean,
  rating?: 1 | 2 | 3 | 4 | 5,
}

const initialFilters: FiltersInterface = {
  category: undefined,
  city: undefined,
  hasServices: undefined,
  hasFurniture: undefined,
  rating: undefined,
}

export const useFiltersStore = create<FiltersStore>()((set) => ({
  filters: initialFilters,
  resetFilters: () => set({filters: initialFilters}),
}))
