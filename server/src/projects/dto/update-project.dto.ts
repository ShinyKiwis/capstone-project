import {
  CreateProjectRequirementDto,
} from './create-project.dto';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ArrayNotEmpty,
  IsEnum,
} from 'class-validator';
import { ProjectStatus } from '../project-status.enum';

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  tasks: string;

  @IsEnum(ProjectStatus)
  status: ProjectStatus;

  @IsNotEmpty()
  references: string;

  @IsNotEmpty()
  stage: number;

  @IsOptional()
  requirements: CreateProjectRequirementDto[];

  @ArrayNotEmpty()
  supervisors: number[];

  @ArrayNotEmpty()
  programs: number[];

  @ArrayNotEmpty()
  branches: number[];

  students: number[];

  @IsNumber()
  limit: number;
}
