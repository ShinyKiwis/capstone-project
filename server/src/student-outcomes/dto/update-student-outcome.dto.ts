import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentOutcomeDto } from './create-student-outcome.dto';

export class UpdateStudentOutcomeDto extends PartialType(CreateStudentOutcomeDto) {}
