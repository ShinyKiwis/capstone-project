import { IsNotEmpty, IsNotEmptyObject } from "class-validator";

export class CreateStudentOutcomeDto {
  @IsNotEmpty()
  code: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  expectedGoal: number;

  @IsNotEmpty()
  passingThreshold: number;
}
