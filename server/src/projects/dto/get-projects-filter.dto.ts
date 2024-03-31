import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProjectStatus } from '../project-status.enum';
import { Registration } from 'src/registrations/entities/registration.entity';

export class GetProjectsFilterDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  members: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  registration: {
    semester: {
      year: number;
      no: number;
    };
    id: number;
  };

  @IsOptional()
  page: number;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status: ProjectStatus;

  @IsOptional()
  owner: number;

  @IsOptional()
  stage: number;

  @IsOptional()
  majors: number[];

  @IsOptional()
  branches: number[];

  @IsOptional()
  supervisors: number[];
}
