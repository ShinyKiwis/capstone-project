import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  id: number;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  generation: number;

  @IsNotEmpty()
  credits: number;

  @IsNotEmpty()
  GPA: number;
}
