import { IsNotEmpty, IsNotEmptyObject } from "class-validator";

export class CreateAssessmentSchemeDto {
  @IsNotEmptyObject()
  semester: {
    year: number;
    no: number;
  };

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  generation: string;

  @IsNotEmpty()
  description: string;

  criteria: {
    type: string;
    content: string;
    performanceIndicator: {
      id: number;
      studentOutcomeId: number;
      studentOutcomeVersionId: number;
      studentOutcomeVersionProgramId: number;
    }
    levels: {
      content: string;
      maxScore: number;
      minScore: number;
    }[]
  }[]

  performanceIndicators: {
    performanceIndicator: {
      id: number;
      studentOutcomeId: number;
      studentOutcomeVersionId: number;
      studentOutcomeVersionProgramId: number;
    }
    passingGoal: number;
  }[]
}
