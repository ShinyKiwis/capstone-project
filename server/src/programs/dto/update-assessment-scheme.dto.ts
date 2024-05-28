export class UpdateAssessmentSchemeDto {
  generation: string;
  name: string;
  description: string;
  semesterId: number;
  criteria: {
    id: number;
    type: string;
    content: string;
    performanceIndicator: {
      id: number;
      studentOutcomeId: number;
      studentOutcomeVersionId: number;
      studentOutcomeVersionProgramId: number;
    };
    levels: {
      id: number;
      content: string;
      maxScore: number;
      minScore: number;
    }[];
  }[];
}