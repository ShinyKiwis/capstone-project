import { AssessmentScheme } from "../entities/assessment-scheme.entity";

export class UpdateAssessmentSchemeToPerformanceIndicatorDto {
  performanceIndicator: {
    id: number;
    studentOutcomeId: number;
    studentOutcomeVersionId: number;
    studentOutcomeVersionProgramId: number;
  };
  passingGoal: number;
}