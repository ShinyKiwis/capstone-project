import { IsNotEmpty } from "class-validator";

export class CreatePerformanceIndicatorDto { 
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  expectedGoal: number;

  passingThreshold: number;
}
