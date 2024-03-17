import { Test, TestingModule } from '@nestjs/testing';
import { SuportController } from './suport.controller';

describe('SuportController', () => {
  let controller: SuportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuportController],
    }).compile();

    controller = module.get<SuportController>(SuportController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
