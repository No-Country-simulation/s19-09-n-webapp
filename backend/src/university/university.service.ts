import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from 'src/database/database.service';
import {
  CreateUniversityDto,
  QueryUniversityDto,
  ReturnUniversityDto,
  ReturnUniversityMinDto,
} from './dto';
import { Cities } from './entities/university.entity';

@Injectable()
export class UniversityService {
  constructor(private readonly dbService: DatabaseService) {}

  private buildSearch(
    queries: QueryUniversityDto,
  ): Prisma.UniversityFindManyArgs {
    const { city, order_by, s, sort_by, minimum } = queries;
    const whereClause: Prisma.UniversityFindManyArgs = {};
    if (city) whereClause.where = { city: city };
    if (s)
      whereClause.where = {
        ...whereClause.where,
        name: { contains: s, mode: 'insensitive' },
      };
    if (minimum) whereClause.select = { id: true, name: true };
    whereClause.orderBy = { [sort_by]: order_by };
    return whereClause;
  }

  async storeNewUniversity(createDto: CreateUniversityDto) {
    const cityName = Cities[createDto.city]
      ? Cities[createDto.city]
      : createDto.city;
    const existUniv = await this.findByNameCity(createDto.name, cityName);
    if (existUniv) {
      throw new BadRequestException(
        'University name already registered in city',
      );
    }

    const newUniv = await this.create(createDto);
    return plainToInstance(ReturnUniversityDto, newUniv);
  }

  async findCitiesList(country: string = 'AR') {
    const citiesWithImages = await this.dbService.university.findMany({
      distinct: ['city'],
      where: { country },
      select: {
        city: true,
        image_url: true,
      },
      orderBy: {
        city: 'asc',
      },
    });
    return citiesWithImages;
  }

  async getById(id: string) {
    const data = await this.findById(id);
    if (!data) {
      throw new NotFoundException();
    }
    return plainToInstance(ReturnUniversityDto, data);
  }

  async findById(id: string) {
    return await this.dbService.university.findUnique({ where: { id } });
  }

  async create(createDto: CreateUniversityDto) {
    const data = await this.dbService.university.create({ data: createDto });
    return data;
  }

  async findAllUniversities(queries?: QueryUniversityDto) {
    const filters = queries ? this.buildSearch(queries) : {};
    const data = await this.dbService.university.findMany(filters);
    return data.map((univ) => {
      if (queries.minimum) {
        return plainToInstance(ReturnUniversityMinDto, univ);
      }
      return plainToInstance(ReturnUniversityDto, univ);
    });
  }

  async findByNameCity(name: string, city: string) {
    return await this.dbService.university.findFirst({
      where: { name, city },
    });
  }
}
