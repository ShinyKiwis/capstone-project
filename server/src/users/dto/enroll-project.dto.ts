import { IsNotEmpty } from 'class-validator';

export class EnrollProjectDto {
  @IsNotEmpty()
  studentId: number;

  @IsNotEmpty()
  projectCode: number;
}
