import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
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
}

export class CreateProjectRequirementDto {
  attribute: string;
  operator: string;
  value: string;
}
