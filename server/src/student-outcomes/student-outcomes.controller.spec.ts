import { Test, TestingModule } from '@nestjs/testing';
import { StudentOutcomesController } from './student-outcomes.controller';
import { StudentOutcomesService } from './student-outcomes.service';

describe('StudentOutcomesController', () => {
  let controller: StudentOutcomesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentOutcomesController],
      providers: [StudentOutcomesService],
    }).compile();

    controller = module.get<StudentOutcomesController>(StudentOutcomesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
