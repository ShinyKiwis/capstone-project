import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Branch } from '../../programs/entities/branch.entity';
import { Semester } from '../../semesters/entities/semester.entity';
import { User } from '../../users/entities/user.entity';
import { ProjectStatus } from '../project-status.enum';
import { Student } from 'src/students/entities/student.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  stage: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  tasks: string;

  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsNotEmpty()
  references: string;

  @IsNotEmptyObject()
  registration: {
    semester: {
      year: number,
      no: number,
    },
    id: number
  }

  @IsOptional()
  requirements: CreateProjectRequirementDto[];

  @ArrayNotEmpty()
  supervisors: {id: number}[];

  @ArrayNotEmpty()
  programs: { id: number }[];

  @ArrayNotEmpty()
  branches: { id: number }[];

  @IsNotEmptyObject()
  owner: { id: number };

  students: { userId: number }[]

  @IsNumber()
  limit: number;

}

export class CreateProjectRequirementDto {
  attribute: string;
  operator: string;
  value: string;
}

