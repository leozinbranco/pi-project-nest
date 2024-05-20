import { Test, TestingModule } from '@nestjs/testing';
import { UpNextService } from './up-next.service';

describe('UpNextService', () => {
  let service: UpNextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpNextService],
    }).compile();

    service = module.get<UpNextService>(UpNextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
