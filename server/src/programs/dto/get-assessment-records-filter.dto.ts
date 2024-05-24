import { IsOptional } from "class-validator";

export class GetAssessmentRecordsFilterDto {
  @IsOptional()
  projectId: number;

  @IsOptional()
  userId: number;
}