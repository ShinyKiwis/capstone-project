import { IsOptional } from "class-validator";
import { UpdateLevelDto } from "./update-level.dto";

export class UpdateCriterionDto {
  @IsOptional()
  id: number;
  
  type: string;

  content: string;
  performanceIndicator: {
    id: number;
    studentOutcomeId: number;
    studentOutcomeVersionId: number;
    studentOutcomeVersionProgramId: number;
  };
  levels: UpdateLevelDto[];
}