import { RealEstateEntityWhitExclude } from '../entities';

export interface PropertyResponseFilter {
  data: RealEstateEntityWhitExclude[];
  page: number;
  totalPages: number;
  limit: number;
}
