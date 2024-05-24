import { IsNotEmpty } from "class-validator";

export class CreateAssessmentRecordDto {
  @IsNotEmpty()
  criterionId: number;

  @IsNotEmpty()
  answer: string;

  @IsNotEmpty()
  userId: number;

  projectId: number;

  score: number;
}