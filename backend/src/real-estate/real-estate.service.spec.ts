import { Test, TestingModule } from '@nestjs/testing';
import { RealEstateService } from './real-estate.service';

describe('RealEstateService', () => {
  let service: RealEstateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealEstateService],
    }).compile();

    service = module.get<RealEstateService>(RealEstateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
