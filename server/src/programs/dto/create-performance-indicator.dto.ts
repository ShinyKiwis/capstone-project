import { IsNotEmpty } from "class-validator";

export class CreatePerformanceIndicatorDto {
  @IsNotEmpty()
  code: string;
  
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  expectedGoal: number;

  @IsNotEmpty()
  passingThreshold: number;
}
