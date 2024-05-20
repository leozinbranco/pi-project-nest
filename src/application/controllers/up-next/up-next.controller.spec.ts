import { Test, TestingModule } from '@nestjs/testing';
import { UpNextController } from './up-next.controller';

describe('UpNextController', () => {
  let controller: UpNextController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpNextController],
    }).compile();

    controller = module.get<UpNextController>(UpNextController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
