import { Test, TestingModule } from '@nestjs/testing';
import { SuportService } from './suport.service';

describe('SuportService', () => {
  let service: SuportService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuportService],
    }).compile();

    service = module.get<SuportService>(SuportService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
