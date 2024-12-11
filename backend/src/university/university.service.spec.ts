import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { DatabaseService } from 'src/database/database.service';
import { UniversityService } from './university.service';
import { University } from './entities/university.entity';
import { CreateUniversityDto } from './dto/create-university.dto';
import { plainToClass } from 'class-transformer';
import Decimal from 'decimal.js';
import { ReturnUniversityDto } from './dto';

describe('UniversityService', () => {
  let service: UniversityService;
  let prismaMock: DeepMockProxy<DatabaseService>;

  const createUniv: CreateUniversityDto = plainToClass(CreateUniversityDto, {
    name: 'University 1',
    city: '',
    latitude: 0.604964,
    longitude: -77.8419,
  });

  const universitiesMock: University[] = [
    {
      id: 'id1',
      name: 'University 1',
      country: 'AR',
      city: '',
      address: '',
      image_url: '',
      latitude: new Decimal(0.604964),
      longitude: new Decimal(-77.8419),
      created_at: new Date('2023-11-01T10:00:00Z'),
      updated_at: new Date('2024-11-21T10:00:00Z'),
    },
    {
      id: 'id2',
      name: 'University 2',
      country: 'AR',
      city: 'City 1',
      address: 'Address 1',
      image_url: '',
      latitude: new Decimal(0.604964),
      longitude: new Decimal(-77.8419),
      created_at: new Date('2023-11-01T10:00:00Z'),
      updated_at: new Date('2024-11-21T10:00:00Z'),
    },
    {
      id: 'id3',
      name: 'University 3',
      country: 'AR',
      city: 'City 2',
      address: '',
      image_url: '',
      latitude: new Decimal(0.604964),
      longitude: new Decimal(-77.8419),
      created_at: new Date('2023-11-01T10:00:00Z'),
      updated_at: new Date('2024-11-21T10:00:00Z'),
    },
    {
      id: 'id4',
      name: 'University 4',
      country: 'AR',
      city: 'City 1',
      address: '',
      image_url: '',
      latitude: new Decimal(0.604964),
      longitude: new Decimal(-77.8419),
      created_at: new Date('2023-11-01T10:00:00Z'),
      updated_at: new Date('2024-11-21T10:00:00Z'),
    },
  ];
  beforeEach(async () => {
    prismaMock = mockDeep<DatabaseService>();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UniversityService,
        { provide: DatabaseService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UniversityService>(UniversityService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });

  it('should return an array of universities', async () => {
    prismaMock.university.findMany.mockResolvedValue(universitiesMock);
    const universities = await service.findAllUniversities();
    expect(universities).toEqual(
      universitiesMock.map((univ) => plainToClass(ReturnUniversityDto, univ)),
    );
  });

  it('should return the created university', async () => {
    prismaMock.university.create.mockResolvedValue(universitiesMock[0]);
    const univ = await service.create(createUniv);
    expect(univ).toEqual(universitiesMock[0]);
  });
});
