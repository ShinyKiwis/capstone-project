import { IsNotEmpty, IsNotEmptyObject } from "class-validator";
import { AssessmentScheme } from "../entities/assessment-scheme.entity";
import { Criterion } from "../entities/criterion.entity";

export class CreateLevelDto {
  criterion: Criterion;
  content: string;
  maxScore: number;
  minScore: number;
}
