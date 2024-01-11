import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateStudentDto {
  id: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  generation: number;

  @IsNotEmpty()
  credits: number;

  @IsNotEmpty()
  GPA: number;
}
