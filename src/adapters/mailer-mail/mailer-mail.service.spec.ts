import { Test, TestingModule } from '@nestjs/testing';
import { MailerMailService } from './mailer-mail.service';

describe('MailerMailService', () => {
  let service: MailerMailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailerMailService],
    }).compile();

    service = module.get<MailerMailService>(MailerMailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
