import { IsNotEmpty, IsNotEmptyObject } from "class-validator";

export class CreateStudentOutcomeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  expectedGoal: number;

  passingThreshold: number;
}
