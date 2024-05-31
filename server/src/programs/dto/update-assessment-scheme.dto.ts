import { UpdateAssessmentSchemeToPerformanceIndicatorDto } from "./update-assessment-scheme-to-performance-indicator.dto";
import { UpdateCriterionDto } from "./update-criterion.dto";

export class UpdateAssessmentSchemeDto {
  generation: string;
  name: string;
  description: string;
  semester: {
    year: number;
    no: number;
  }
  criteria: UpdateCriterionDto[];

  performanceIndicators: UpdateAssessmentSchemeToPerformanceIndicatorDto[]
}