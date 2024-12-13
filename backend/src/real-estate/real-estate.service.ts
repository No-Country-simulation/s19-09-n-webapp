import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import {
  FilterRealEstateByUserIdDto,
  FilterRealEstateDto,
} from './dto/filter-real-sate.dto';
import {
  AddNearUniversityDto,
  AddRoomsOnPropertyDto,
  AddServicesOnPropertyDto,
  CreateRealEstateDto,
} from './dto/create-real-estate.dto';
import { DatabaseService } from 'src/database/database.service';
import { UpdateRealEstateDto } from './dto/update-real-estate.dto';
import { PropertyResponseFilter } from './Types/response.interface';
import { RealEstateEntity, RealEstateEntityWhitExclude } from './entities';
import { Prisma } from '@prisma/client';

@Injectable()
export class RealEstateService {
  constructor(private readonly dbService: DatabaseService) {}

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
  async getAllRealEstates(
    filters: FilterRealEstateDto,
  ): Promise<PropertyResponseFilter> {
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
      isServicesIncluded,
    } = filters;

    const where: any = { is_active: true };
    if (city) where.city = { equals: city };
    if (property_type) where.property_type = property_type;
    if (max_occupants) where.max_occupants = { lte: max_occupants };
    if (rating) where.rating = { gte: rating };
    if (minPrice !== undefined && minPrice >= 0)
      where.payment_by_period = { gte: minPrice };
    if (maxPrice !== undefined && maxPrice >= 0)
      where.payment_by_period = { lte: maxPrice };
    if (rentalPeriod) where.min_rental_period = rentalPeriod;
    if (isFurnished !== undefined) where.is_furnished = isFurnished;
    if (isServicesIncluded !== undefined)
      where.is_services_included = isServicesIncluded;

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
            updated_at: true,
          },
          include: {
            user: {
              select: {
                name: true,
                last_name: true,
                email: true,
              },
            },
            rooms: {
              omit: {
                property_id: true,
                room_id: true,
              },
              include: {
                room: {
                  select: {
                    type: true,
                    quantity: true,
                  },
                },
              },
            },
            services: {
              omit: {
                property_id: true,
                service_id: true,
              },
              include: {
                service: {
                  select: {
                    type: true,
                  },
                },
              },
            },
            photos: {
              omit: {
                property_id: true,
              },
            },
          },
        }),
        this.dbService.property.count(),
      ]);

      return {
        limit,
        page,
        totalPages: take > 0 ? Math.ceil(total / take) : 1,
        data: plainToInstance(RealEstateEntityWhitExclude, data),
      };
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
              email: true,
            },
          },
          rooms: {
            omit: {
              property_id: true,
              room_id: true,
            },
            include: {
              room: {
                select: {
                  type: true,
                  quantity: true,
                },
              },
            },
          },
          services: {
            omit: {
              property_id: true,
              service_id: true,
            },
            include: {
              service: {
                select: {
                  type: true,
                },
              },
            },
          },
          photos: {
            omit: {
              property_id: true,
            },
          },
          near_universities: {
            omit: {
              id: true,
              property_id: true,
              university_id: true,
            },
            include: {
              university: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!data) {
        throw new HttpException(
          {
            message: 'Property not found or not exists.',
          },
          HttpStatus.NOT_FOUND,
        );
      }
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
  async GetPropertiesByUserID(
    filters: FilterRealEstateByUserIdDto,
    id: string,
  ): Promise<PropertyResponseFilter> {
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
                email: true,
              },
            },
            rooms: {
              omit: {
                property_id: true,
                room_id: true,
              },
              include: {
                room: {
                  select: {
                    type: true,
                    quantity: true,
                  },
                },
              },
            },
            services: {
              omit: {
                property_id: true,
                service_id: true,
              },
              include: {
                service: {
                  select: {
                    type: true,
                  },
                },
              },
            },
            near_universities: {
              omit: {
                id: true,
                property_id: true,
                university_id: true,
              },
              include: {
                university: {
                  select: {
                    name: true,
                  },
                },
              },
            },
            photos: {
              omit: {
                property_id: true,
              },
            },
          },
        }),
        await this.dbService.property.count({ where: { user_id: id } }),
      ]);

      return {
        limit,
        page: page,
        totalPages: take > 0 ? Math.ceil(total / take) : 1,
        data: plainToInstance(RealEstateEntityWhitExclude, data),
      };
    } catch (error) {
      throw new HttpException(
        {
          code: error.code,
          name: error.name,
          message: error.meta?.cause || error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
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
  async deleteRealEstate(
    property_id: string,
    user_id: string,
  ): Promise<{ message: string }> {
    try {
      const Property = await this.dbService.property.findUnique({
        where: { id: property_id },
      });

      if (Property && Property.user_id !== user_id) {
        throw new HttpException(
          {
            message:
              'Access denied, the user does not have permission to delete this property',
            code: HttpStatus.FORBIDDEN,
            name: 'ForbiddenException',
          },
          HttpStatus.FORBIDDEN,
        );
      } else if (!Property) throw new NotFoundException('Property not found');

      await this.dbService.property.update({
        where: { id: property_id },
        data: { is_active: false },
      });

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
  async createRealEstateService(
    data: CreateRealEstateDto,
    user_id: string,
  ): Promise<RealEstateEntity> {
    try {
      const { rooms, services, near_universities, ...NewProperty } = data;

      const result = await this.dbService.$transaction(async (tx) => {
        const property = await tx.property.create({
          data: { ...NewProperty, user_id },
        });

        const [addedRooms, addedServices, addedNearUniversities] =
          await Promise.all([
            this.addRoomsToRealEstateService(tx, rooms, property.id),
            this.addServicesToRealEstateService(tx, services, property.id),
            this.addNearUniversityToRealEstateService(
              tx,
              near_universities,
              property.id,
            ),
          ]);

        if (
          addedRooms.count === 0 ||
          addedServices.count === 0 ||
          addedNearUniversities.count === 0
        ) {
          throw new HttpException(
            {
              message: "Someting went wrong the property won't be created",
            },
            HttpStatus.CONFLICT,
          );
        }

        return property;
      });

      return plainToInstance(RealEstateEntity, result);
    } catch (error) {
      throw error;
    }
  }

  // * Add rooms to real estate ----------------------------------------------------------------------------------------------//

  /**
   * Adds rooms to a real estate property by creating entries in the roomsOnProperty table.
   *
   * @param tx - The Prisma transaction client for executing database operations.
   * @param data - An array of AddRoomsOnPropertyDto objects containing the room details to be added.
   * @param property_id - The unique identifier of the property to which the rooms are to be added.
   * @returns A promise that resolves to a count of the number of rooms added.
   * @throws An error if the addition process fails.
   */
  async addRoomsToRealEstateService(
    tx: Prisma.TransactionClient,
    data: AddRoomsOnPropertyDto[],
    property_id: string,
  ) {
    try {
      const rooms = data.map((room) => ({
        property_id,
        room_id: room.room_id,
      }));

      return await tx.roomsOnProperty.createMany({
        data: rooms,
        skipDuplicates: true,
      });
    } catch (error) {
      throw error;
    }
  }

  // * Add services to real estate ----------------------------------------------------------------------------------------------//

  /**
   * Adds services to a real estate property by creating entries in the servicesOnProperty table.
   *
   * @param tx - The Prisma transaction client for executing database operations.
   * @param data - An array of AddServicesOnPropertyDto objects containing the service details to be added.
   * @param property_id - The unique identifier of the property to which the services are to be added.
   * @returns A promise that resolves to a count of the number of services added.
   * @throws An error if the addition process fails.
   */
  async addServicesToRealEstateService(
    tx: Prisma.TransactionClient,
    data: AddServicesOnPropertyDto[],
    property_id: string,
  ) {
    try {
      const services = data.map((service) => ({
        property_id,
        service_id: service.service_id,
      }));

      return await tx.servicesOnProperty.createMany({
        data: services,
        skipDuplicates: true,
      });
    } catch (error) {
      throw error;
    }
  }

  // * Add nearby universities to real estate ----------------------------------------------------------------------------------------------//
  /**
   * Adds nearby universities to a real estate property by creating entries in the nearLocation table.
   *
   * @param tx - The Prisma transaction client for executing database operations.
   * @param data - An array of AddNearUniversityDto objects containing the details of the universities to be added.
   * @param property_id - The unique identifier of the property to which the universities are to be added.
   * @returns A promise that resolves to a count of the number of universities added
   * @throws An error if the addition process fails.
   */
  async addNearUniversityToRealEstateService(
    tx: Prisma.TransactionClient,
    data: AddNearUniversityDto[],
    property_id: string,
  ) {
    try {
      const universities = data.map((university) => ({
        property_id,
        distance: university.distance,
        university_id: university.university_id,
      }));

      return await tx.nearLocation.createMany({
        data: universities,
      });
    } catch (error) {
      throw error;
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
  // async addPhotoToRealEstateService(
  //   data: AddPropertyPhotoDto[],
  //   property_id: string,
  // ) {
  //   try {
  //     const propertyPhoto = await this.dbService.propertyPhoto.findMany({
  //       where: { property_id },
  //     });
  //     if (propertyPhoto.length > 0)
  //       await this.dbService.propertyPhoto.deleteMany({
  //         where: { property_id },
  //       });

  //     const photos = data.map((photo) => ({
  //       property_id,
  //       photo_url: photo.photo_url,
  //       photo_service_id: photo.photo_service_id,
  //     }));

  //     await this.dbService.propertyPhoto.createMany({ data: photos });
  //   } catch (error) {
  //     throw new HttpException(
  //       {
  //         message: 'The property was created but the photos could not be added',
  //         code: error.code,
  //         name: error.name,
  //         stack: error.meta?.cause || error.message,
  //       },
  //       HttpStatus.CONFLICT,
  //     );
  //   }
  // }

  // * Update real estate ----------------------------------------------------------------------------------------------//

  /**
   * Updates an existing real estate property with new details.
   * The function checks if the user has permission to update the property
   * and if the property exists before proceeding with the update.
   * It updates the main property details as well as associated rooms,
   * services, and nearby universities.
   *
   * @param property_id - The unique identifier of the property to be updated.
   * @param user_id - The unique identifier of the user attempting the update.
   * @param data - An UpdateRealEstateDto object containing the new property details.
   * @returns A promise that resolves to the updated property as a RealEstateEntityWhitExclude.
   * @throws A HttpException if the user does not have permission to update the property.
   * @throws A NotFoundException if the property is not found.
   */
  async updateRealEstateService(
    property_id: string,
    user_id: string,
    data: UpdateRealEstateDto,
  ): Promise<RealEstateEntityWhitExclude> {
    try {
      const Property = await this.dbService.property.findUnique({
        where: { id: property_id },
      });

      if (!Property) throw new NotFoundException('Property not found');

      if (Property.user_id !== user_id) {
        throw new HttpException(
          {
            message:
              'Access denied, the user does not have permission to update this property',
            code: HttpStatus.FORBIDDEN,
            name: 'ForbiddenException',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      const { rooms, services, near_universities, ...property } = data;

      const result = await this.dbService.$transaction(async (tx) => {
        const propertyToUpdate = await tx.property.update({
          where: { id: property_id },
          data: property,
        });

        if (rooms) {
          await tx.roomsOnProperty.deleteMany({ where: { property_id } });
          await this.addRoomsToRealEstateService(tx, rooms, property_id);
        }

        if (services) {
          await tx.servicesOnProperty.deleteMany({ where: { property_id } });
          await this.addServicesToRealEstateService(tx, services, property_id);
        }

        if (near_universities) {
          await tx.nearLocation.deleteMany({ where: { property_id } });
          await this.addNearUniversityToRealEstateService(
            tx,
            near_universities,
            property_id,
          );
        }

        return propertyToUpdate;
      });

      return plainToInstance(RealEstateEntityWhitExclude, result);
    } catch (error) {
      throw error;
    }
  }
}
