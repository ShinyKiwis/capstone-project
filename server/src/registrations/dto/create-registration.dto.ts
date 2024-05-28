import { IsNotEmpty } from "class-validator";

export class CreateRegistrationDto {
  @IsNotEmpty()
  semester: { year: number, no: number};

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;
}
