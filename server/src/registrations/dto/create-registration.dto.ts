import { IsNotEmpty } from "class-validator";

export class CreateRegistrationDto {
  @IsNotEmpty()
  semester: { year: number, no: number};

  startDate: Date;

  endDate: Date;
}
