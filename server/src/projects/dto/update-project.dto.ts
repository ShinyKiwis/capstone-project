import { PartialType } from "@nestjs/mapped-types";
import { CreateProjectDto, CreateProjectRequirementDto } from "./create-project.dto";
import { IsString, IsNotEmpty, IsNumber, IsOptional, ArrayNotEmpty } from "class-validator";
import { Branch } from "src/programs/entities/branch.entity";
import { Major } from "src/programs/entities/major.entity";
import { Semester } from "src/semesters/entities/semester.entity";
import { User } from "src/users/entities/user.entity";

export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  tasks: string;

  @IsNotEmpty()
  references: string;

  @IsOptional()
  requirements: CreateProjectRequirementDto[];

  @ArrayNotEmpty()
  supervisors: number[];

  @ArrayNotEmpty()
  majors: number[];

  @ArrayNotEmpty()
  branches: number[];

  students: number[];

  @IsNumber()
  limit: number;
}
