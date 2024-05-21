import { IsNotEmpty, IsNotEmptyObject } from "class-validator";
import { AssessmentScheme } from "../entities/assessment-scheme.entity";

export class CreateCriterionDto {
  assessmentScheme: AssessmentScheme;
  content: string;
  performanceIndicator: {
    id: number;
    studentOutcomeId: number;
    studentOutcomeVersionId: number;
    studentOutcomeVersionProgramId: number;
  };
  type: string;
  levels: {
    content: string;
    maxScore: number;
    minScore: number;
  }[];
}
