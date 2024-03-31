import { Module } from '@nestjs/common';
import { StudentOutcomesService } from './student-outcomes.service';
import { StudentOutcomesController } from './student-outcomes.controller';

@Module({
  controllers: [StudentOutcomesController],
  providers: [StudentOutcomesService],
})
export class StudentOutcomesModule {}
