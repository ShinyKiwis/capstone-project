import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Branch } from '../../programs/entities/branch.entity';
import { Major } from '../../programs/entities/major.entity';
import { Semester } from '../../semesters/entities/semester.entity';
import { User } from '../../users/entities/user.entity';

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

  @IsNotEmpty()
  references: string;

  semester: Semester;

  @IsOptional()
  requirements: CreateProjectRequirementDto[];

  @ArrayNotEmpty()
  supervisors: User[];

  @ArrayNotEmpty()
  majors: Major[];

  @ArrayNotEmpty()
  branches: Branch[];

  @IsNumber()
  limit: number;

}

export class CreateProjectRequirementDto {
  attribute: string;
  operator: string;
  value: string;
}
