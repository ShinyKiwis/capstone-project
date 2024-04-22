import { IsNotEmpty } from "class-validator";

export class CreateProgramEducationObjectiveDto {
  @IsNotEmpty()
  name: string;

  description: string;
}