import { Test, TestingModule } from '@nestjs/testing';
import { StudentOutcomesService } from './student-outcomes.service';

describe('StudentOutcomesService', () => {
  let service: StudentOutcomesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentOutcomesService],
    }).compile();

    service = module.get<StudentOutcomesService>(StudentOutcomesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
