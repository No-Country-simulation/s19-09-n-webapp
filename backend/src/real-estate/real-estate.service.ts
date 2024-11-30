import { Injectable } from '@nestjs/common';

import { RealEstateProperty } from './entities';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class RealEstateService {
  constructor(private readonly dbService: DatabaseService){}

  /**
   * Retrieve all real estates with pagination.
   *
   * @param page Page number, defaults to 1.
   * @param limit Number of items per page, defaults to 10.
   * @returns An object with the following properties: data, total, page, totalPages.
   */
  // REVIEW: Data response relationship with real estates.
  async  getAllRealEstates(page = 1, limit = 10) {
    const take = Math.max(1, limit);
    const skip = (Math.max(1, page) - 1 ) * take;

    try{
      const [data, total] =  await Promise.all([
        this.dbService.property.findMany({
          skip,
          take,
          include: {
            services: { include: { service: true } },
            rooms: { include: { room: true } },
          },
        }),
        this.dbService.property.count(),
      ])

      return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / take),
      }
    } catch (error) {
      throw new Error(`Error retrieving real estates: ${error.message}`);
    }
  }

}
