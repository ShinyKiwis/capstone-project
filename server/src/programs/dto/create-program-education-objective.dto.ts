import { IsNotEmpty } from "class-validator";

export class CreateProgramEducationObjectiveDto {
  @IsNotEmpty()
  code: string;

  description: string;
}