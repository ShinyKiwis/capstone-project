import { IsNotEmpty, IsNotEmptyObject } from "class-validator";

export class CreateAssessmentSchemeDto {
  @IsNotEmptyObject()
  semester: {
    year: number;
    no: number;
  };

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
