import { IsOptional } from "class-validator";

export class UpdateLevelDto {
  @IsOptional()
  id: number;
  
  content: string;
  maxScore: number;
  minScore: number;
}