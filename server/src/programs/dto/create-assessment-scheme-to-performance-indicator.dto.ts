import { IsNotEmpty, IsNotEmptyObject } from "class-validator";
import { AssessmentScheme } from "../entities/assessment-scheme.entity";

export class CreateAssessmentSchemeToPerformanceIndicatorDto {
  performanceIndicator: {
    id: number;
    studentOutcomeId: number;
    studentOutcomeVersionId: number;
    studentOutcomeVersionProgramId: number;
  }
  assessmentScheme: AssessmentScheme;
  passingGoal: number;
}
