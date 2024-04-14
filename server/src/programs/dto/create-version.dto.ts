import { IsNotEmpty } from 'class-validator';

export class CreateVersionDto {
  @IsNotEmpty()
  name: string;

  description: string;

  startDate: Date;

  endDate: Date;
}
