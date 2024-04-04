import { IsNotEmpty } from 'class-validator';

export class CreateVersionDto {
  @IsNotEmpty()
  name: string;

  startDate: Date;

  endDate: Date;
}
