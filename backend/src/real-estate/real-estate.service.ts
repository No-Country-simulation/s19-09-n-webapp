import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { RealEstateEntityWhitExclude } from './entities';
import { DatabaseService } from 'src/database/database.service';
import { FilterRealEstateDto } from './dto/filter-real-sate.dto';
import { CreateRealEstateDto } from './dto/create-real-estate.dto';

@Injectable()
export class RealEstateService {
  constructor(private readonly dbService: DatabaseService){}
/**
 * Retrieves a list of real estate properties based on the provided filters.
 * The function supports pagination and various filtering options such as city, property type,
 * maximum occupants, price range, rental period, and whether the property is furnished or has services included
 * If isn't provided it will return all the properties.
 * Throws an error if there is an issue retrieving the properties.
 *
 * @param {FilterRealEstateDto} filters - The filters to apply when querying real estate properties.
 * @returns {Promise<{data: RealEstateEntity[], total: number, page: number, totalPages: number}>} An object containing the filtered list of properties, total number of properties, current page, and total pages.
 *
 */
  async  getAllRealEstates(filters: FilterRealEstateDto): Promise<{ data: RealEstateEntityWhitExclude[]; total: number; page: number; totalPages: number; }> {
    const {
      page,
      limit,
      city,
      property_type,
      max_occupants,
      minPrice,
      maxPrice,
      rentalPeriod,
      isFurnished,
      isServicesIncluded
    } = filters;

    const where: any = {};
    if(city) where.city = { contains: city, mode: 'insensitive' };
    if(property_type) where.property_type = property_type;
    if(max_occupants) where.max_occupants = { lte: max_occupants };
    if(minPrice !== undefined && minPrice >= 0) where.payment_by_period = { gte: minPrice };
    if(maxPrice !== undefined && maxPrice >= 0) where.payment_by_period = { lte: maxPrice };
    if(rentalPeriod) where.min_rental_period = rentalPeriod;
    if(isFurnished !== undefined) where.is_furnished = isFurnished;
    if(isServicesIncluded !== undefined) where.is_services_included = isServicesIncluded;

    const skip = (page - 1) * limit;
    const take = limit;

    try{
      const [data, total] =  await Promise.all([
        this.dbService.property.findMany({
          where,
          skip,
          take,
          orderBy: { created_at: 'desc' },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                last_name: true,
                email: true
              }
            },
            location: true,
            rooms: true,
            services: true,
          },
        }),
        this.dbService.property.count(),
      ])

      return {
        data: plainToInstance(RealEstateEntityWhitExclude, data),
        total,
        page,
        totalPages: take > 0 ? Math.ceil(total / take) : 1,
      }
    } catch (error) {
      throw new Error(`Error retrieving real estates: ${error.message}`);
    }
  }


/**
 * Retrieves a real estate property by its unique identifier.
 *
 * @param id - The unique identifier of the real estate property.
 * @returns A promise that resolves to a RealEstateEntityWhitExclude instance
 *          containing the property details, including associated user, location,
 *          rooms, and services.
 * @throws An error if the retrieval process fails.
 */
  async GetRealEstateById(id: string): Promise<RealEstateEntityWhitExclude> {
    try {
      const data = await this.dbService.property.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              last_name: true,
              email: true
            }
          },
          location: true,
          rooms: true,
          services: true,
        },
      });

      return plainToInstance(RealEstateEntityWhitExclude, data);
    } catch (error) {
      throw new Error(`Error retrieving real estate: ${error.message}`);
    }
  }



  /**
   * Retrieves a list of real estate properties associated with the given user id.
   *
   * @param id - The unique identifier of the user.
   * @returns A promise that resolves to an array of RealEstateEntityWhitExclude
   *          instances containing the associated properties, including user,
   *          location, rooms, and services.
   * @throws An error if the retrieval process fails.
   */
  async GetPropertiesByUserID(id: string): Promise<RealEstateEntityWhitExclude[]> {
    try {
      const data = await this.dbService.property.findMany({
        where: { user_id: id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              last_name: true,
              email: true
            }
          },
          location: true,
          rooms: true,
          services: true,
        },
      });

      return plainToInstance(RealEstateEntityWhitExclude, data);
    } catch (error) {
      throw new Error(`Error retrieving real estate: ${error.message}`);
    }
  }
}
