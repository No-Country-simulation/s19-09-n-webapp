import { plainToInstance } from 'class-transformer';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { PropertyResponseFilter } from './Types/response.interface';
import { RealEstateEntity, RealEstateEntityWhitExclude } from './entities';
import { FilterRealEstateByUserIdDto, FilterRealEstateDto } from './dto/filter-real-sate.dto';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto'
import { AddNearUniversityDto, AddPropertyPhotoDto, AddRoomsOnPropertyDto, AddServicesOnPropertyDto, CreateRealEstateDto } from './dto/create-real-estate.dto';
import { RoomsOnProperty } from '@prisma/client';

@Injectable()
export class RealEstateService {
  constructor(private readonly dbService: DatabaseService) { }

  // * Get all real estates ----------------------------------------------------------------------------------------------//
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
  async getAllRealEstates(filters: FilterRealEstateDto): Promise<PropertyResponseFilter> {
    const {
      page,
      limit,
      city,
      rating,
      property_type,
      max_occupants,
      minPrice,
      maxPrice,
      rentalPeriod,
      isFurnished,
      isServicesIncluded
    } = filters;

    const where: any = { is_active: true };
    if (city) where.city = { equals: city };
    if (property_type) where.property_type = property_type;
    if (max_occupants) where.max_occupants = { lte: max_occupants };
    if (rating) where.rating = { gte: rating };
    if (minPrice !== undefined && minPrice >= 0) where.payment_by_period = { gte: minPrice };
    if (maxPrice !== undefined && maxPrice >= 0) where.payment_by_period = { lte: maxPrice };
    if (rentalPeriod) where.min_rental_period = rentalPeriod;
    if (isFurnished !== undefined) where.is_furnished = isFurnished;
    if (isServicesIncluded !== undefined) where.is_services_included = isServicesIncluded;

    const skip = (page - 1) * limit;
    const take = limit;

    try {
      const [data, total] = await Promise.all([
        this.dbService.property.findMany({
          where,
          skip,
          take,
          orderBy: { created_at: 'desc' },
          omit: {
            user_id: true,
            updated_at: true
          },
          include: {
            user: {
              select: {
                name: true,
                last_name: true,
                email: true
              }
            },
            rooms: {
              omit: {
                property_id: true,
                room_id: true
              },
              include: {
                room: {
                  select: {
                    type: true,
                    quantity: true
                  }
                }
              }
            },
            services: {
              omit: {
                property_id: true,
                service_id: true
              },
              include: {
                service: {
                  select: {
                    type: true
                  }
                },
              }
            },
            photos: {
              omit: {
                property_id: true,
              }
            }
          },
        }),
        this.dbService.property.count(),
      ])

      return {
        limit,
        page,
        totalPages: take > 0 ? Math.ceil(total / take) : 1,
        data: plainToInstance(RealEstateEntityWhitExclude, data),
      }
    } catch (error) {
      throw error;
    }
  }

  // * Get real estate by id ----------------------------------------------------------------------------------------------//
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
        where: { id, is_active: true },
        omit: {
          user_id: true,
          updated_at: true,
        },
        include: {
          user: {
            select: {
              name: true,
              last_name: true,
              email: true
            }
          },
          rooms: {
            omit: {
              property_id: true,
              room_id: true
            },
            include: {
              room: {
                select: {
                  type: true,
                  quantity: true
                }
              }
            }
          },
          services: {
            omit: {
              property_id: true,
              service_id: true
            },
            include: {
              service: {
                select: {
                  type: true
                }
              },
            }
          },
          photos: {
            omit: {
              property_id: true,
            }
          },
          near_universities: {
            omit: {
              id: true,
              property_id: true,
              university_id: true
            },
            include: {
              university: {
                select: {
                  name: true,
                }
              }
            }
          },
        },
      });

      if (!data) {
        throw new HttpException({
          message: 'Property not found or not exists.',
        }, HttpStatus.NOT_FOUND);
      };
      return plainToInstance(RealEstateEntityWhitExclude, data);
    } catch (error) {
      throw error;
    }
  }

  // * Get real estate by user id ----------------------------------------------------------------------------------------------//
  /**
   * Retrieves a list of real estate properties associated with the given user
   * identifier. Supports pagination and sorting.
   *
   * @param {FilterRealEstateByUserIdDto} filters - The filters to apply when
   *  querying real estate properties associated with the user.
   * @returns {Promise<{ data: RealEstateEntityWhitExclude[], page: number,
   *  totalPages: number}>} An object containing the filtered list of
   *  properties, current page, and total pages.
   *
   */
  async GetPropertiesByUserID(filters: FilterRealEstateByUserIdDto, id: string): Promise<PropertyResponseFilter> {
    const { page, limit } = filters;
    const skip = (page - 1) * limit;
    const take = limit;

    try {
      const [data, total] = await Promise.all([
        await this.dbService.property.findMany({
          where: { user_id: id, is_active: true },
          skip,
          take,
          orderBy: { created_at: 'desc' },
          include: {
            user: {
              select: {
                name: true,
                last_name: true,
                email: true
              }
            },
            rooms: {
              omit: {
                property_id: true,
                room_id: true
              },
              include: {
                room: {
                  select: {
                    type: true,
                    quantity: true
                  }
                }
              }
            },
            services: {
              omit: {
                property_id: true,
                service_id: true
              },
              include: {
                service: {
                  select: {
                    type: true
                  }
                },
              }
            },
            near_universities: {
              omit: {
                id: true,
                property_id: true,
                university_id: true
              },
              include: {
                university: {
                  select: {
                    name: true,
                  }
                }
              }
            },
            photos: {
              omit: {
                property_id: true,
              }
            }
          },
        }),
        await this.dbService.property.count({ where: { user_id: id } }),
      ])

      return {
        limit,
        page: page,
        totalPages: take > 0 ? Math.ceil(total / take) : 1,
        data: plainToInstance(RealEstateEntityWhitExclude, data),
      };
    } catch (error) {
      throw new HttpException({
        code: error.code,
        name: error.name,
        message: error.meta?.cause || error.message,
      }, HttpStatus.BAD_REQUEST);
    }
  }

  // * Delete real estate ----------------------------------------------------------------------------------------------//
  /**
   * Deletes a real estate property by setting its is_active property to false.
   *
   * @param id - The unique identifier of the property to be deleted.
   * @returns A promise that resolves to an object with a message property
   *          containing the confirmation message.
   * @throws An error if the deletion process fails.
   */
  async deleteRealEstate(property_id: string, user_id: string): Promise<{ message: string }> {
    try {
      const Property = await this.dbService.property.findUnique({ where: { id: property_id } });

      if (Property && Property.user_id !== user_id) {
        throw new HttpException({
          message: "Access denied, the user does not have permission to delete this property",
          code: HttpStatus.FORBIDDEN,
          name: "ForbiddenException",
        }, HttpStatus.FORBIDDEN);
      } else if (!Property) throw new NotFoundException("Property not found");

      await this.dbService.property.update({
        where: { id: property_id },
        data: { is_active: false },
      })

      return { message: 'Property deleted successfully' };
    } catch (error) {
      throw error;
    }
  }

  // * Create real estate ----------------------------------------------------------------------------------------------//
  /**
   * Creates a new real estate property.
   *
   * @param data - The details of the property to be created.
   * @returns A promise that resolves to the newly created property as a RealEstateEntity.
   * @throws An error if the creation process fails.
   */
  async createRealEstateService(data: CreateRealEstateDto, user_id: string): Promise<RealEstateEntity> {
    try {
      const newProperty = await this.dbService.property.create({
        data: {
          title: data.title,
          address: data.address,
          city: data.city,
          property_type: data.property_type,
          max_occupants: data.max_occupants,
          payment_by_period: data.payment_by_period,
          min_rental_period: data.min_rental_period,
          is_furnished: data.is_furnished,
          is_services_included: data.is_services_included,
          user_id: user_id,
        }
      });

      return plainToInstance(RealEstateEntity, newProperty);
    } catch (error) {
      throw error;
    }
  }

  // * Add rooms to real estate ----------------------------------------------------------------------------------------------//
  /**
   * Adds rooms to a real estate property by creating entries in the roomsOnProperty table.
   *
   * @param data - An array of AddRoomsOnPropertyDto objects containing the room details to be added.
   * @param property_id - The unique identifier of the property to which the rooms are to be added.
   * @returns A promise that resolves when all room entries have been created.
   */
  async addRoomsToRealEstateService(data: AddRoomsOnPropertyDto[], property_id: string) {
    try {
      const roomsOnProperty = await this.dbService.roomsOnProperty.findMany({ where: { property_id } });
      if (roomsOnProperty.length > 0) await this.dbService.roomsOnProperty.deleteMany({ where: { property_id } });

      const rooms = data.map((room) => ({
        property_id,
        room_id: room.room_id
      }))

      await this.dbService.roomsOnProperty.createMany({ data: rooms });
    } catch (error) {
      throw new HttpException({
        message: "The property was created but the rooms could not be added",
        code: error.code,
        name: error.name,
        stack: error.meta?.cause || error.message,
      }, HttpStatus.CONFLICT);
    }
  }

  // * Add services to real estate ----------------------------------------------------------------------------------------------//
  /**
   * Adds services to a real estate property by creating entries in the servicesOnProperty table.
   *
   * @param data - An array of AddServicesOnPropertyDto objects containing the service details to be added.
   * @param property_id - The unique identifier of the property to which the services are to be added.
   * @returns A promise that resolves when all service entries have been created.
   */
  async addServicesToRealEstateService(data: AddServicesOnPropertyDto[], property_id: string) {
    try {
      const servicesOnProperty = await this.dbService.servicesOnProperty.findMany({ where: { property_id } });
      if (servicesOnProperty.length > 0) await this.dbService.servicesOnProperty.deleteMany({ where: { property_id } });

      const services = data.map((service) => ({
        property_id,
        service_id: service.service_id
      }))

      await this.dbService.servicesOnProperty.createMany({ data: services });

    } catch (error) {
      throw new HttpException({
        message: "The property was created but the services could not be added",
        code: error.code,
        name: error.name,
        stack: error.meta?.cause || error.message,
      }, HttpStatus.CONFLICT);
    }
  }

  // * Add nearby universities to real estate ----------------------------------------------------------------------------------------------//
  /**
   * Adds nearby universities to a real estate property by creating entries in the nearLocation table.
   *
   * @param data - An array of AddNearUniversityDto objects containing the details of the universities to be added.
   * @param property_id - The unique identifier of the property to which the universities are to be added.
   * @returns A promise that resolves when all university entries have been created.
   */
  async addNearUniversityToRealEstateService(data: AddNearUniversityDto[], property_id: string) {
    try {
      const nearLocation = await this.dbService.nearLocation.findMany({ where: { property_id } });
      if (nearLocation.length > 0) await this.dbService.nearLocation.deleteMany({ where: { property_id } });

      const universities = data.map((university) => ({
        property_id,
        distance: university.distance,
        university_id: university.university_id
      }))

      await this.dbService.nearLocation.createMany({ data: universities });
    } catch (error) {
      throw new HttpException({
        message: "The property was created but the universities could not be added",
        code: error.code,
        name: error.name,
        stack: error.meta?.cause || error.message,
      }, HttpStatus.CONFLICT);
    }
  }

  // * Add photos to real estate ----------------------------------------------------------------------------------------------//
  /**
   * Adds photos to a real estate property by creating entries in the propertyPhoto table.
   *
   * @param data - An array of AddPropertyPhotoDto objects containing the photo details to be added.
   * @param property_id - The unique identifier of the property to which the photos are to be added.
   * @returns A promise that resolves when all photo entries have been created.
   */
  async addPhotoToRealEstateService(data: AddPropertyPhotoDto[], property_id: string) {
    try {
      const propertyPhoto = await this.dbService.propertyPhoto.findMany({ where: { property_id } });
      if (propertyPhoto.length > 0) await this.dbService.propertyPhoto.deleteMany({ where: { property_id } });

      const photos = data.map((photo) => ({
        property_id,
        photo_base_64: photo.photo_url
      }))

      await this.dbService.propertyPhoto.createMany({ data: photos });

    } catch (error) {
      throw new HttpException({
        message: "The property was created but the photos could not be added",
        code: error.code,
        name: error.name,
        stack: error.meta?.cause || error.message,
      }, HttpStatus.CONFLICT);
    }
  }

  // * Update real estate ----------------------------------------------------------------------------------------------//

  /**
   * Updates a real estate property by modifying the corresponding entries in the property table.
   *
   * @param property_id - The unique identifier of the property to be updated.
   * @param user_id - The unique identifier of the user who is trying to update the property.
   * @param data - An UpdateRealEstateDto object containing the new values for the property.
   * @returns A promise that resolves with a message indicating whether the property was updated successfully or not.
   * @throws HttpException if the user does not have permission to update the property or if the property does not exist.
   */
  async updateRealEstateService(property_id: string, user_id: string, data: UpdateRealEstateDto,): Promise<RealEstateEntityWhitExclude> {
    try {
      const Property = await this.dbService.property.findUnique({ where: { id: property_id } });

      if (Property && Property.user_id !== user_id) {
        throw new HttpException({
          message: "Access denied, the user does not have permission to update this property",
          code: HttpStatus.FORBIDDEN,
          name: "ForbiddenException",
        }, HttpStatus.FORBIDDEN);
      } else if (!Property) throw new NotFoundException("Property not found");

      const property = await this.dbService.property.update({
        where: { id: property_id },
        data: {
          title: data.title,
          address: data.address,
          city: data.city,
          property_type: data.property_type,
          max_occupants: data.max_occupants,
          payment_by_period: data.payment_by_period,
          min_rental_period: data.min_rental_period,
          is_furnished: data.is_furnished,
          is_services_included: data.is_services_included,
          rating: data.rating,
          is_available: data.is_available
        }
      });

      return plainToInstance(RealEstateEntityWhitExclude, property);
    } catch (error) {
      throw error;
    }
  }

}
