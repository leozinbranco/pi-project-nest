import { Test, TestingModule } from '@nestjs/testing';
import { ValidationDocumentService } from './validation-document.service';

describe('ValidationDocumentService', () => {
  let service: ValidationDocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ValidationDocumentService],
    }).compile();

    service = module.get<ValidationDocumentService>(ValidationDocumentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
