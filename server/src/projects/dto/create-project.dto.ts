import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Branch } from 'src/programs/entities/branch.entity';
import { Major } from 'src/programs/entities/major.entity';
import { Semester } from 'src/semesters/entities/semester.entity';
import { User } from 'src/users/entities/user.entity';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  stage: number;

  @IsString()
  @IsNotEmpty()
  detail: string;

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
