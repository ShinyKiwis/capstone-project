import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProjectStatus } from '../project-status.enum';

export class GetProjectsFilterDto {
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  members: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  page: number;

  @IsEnum(ProjectStatus)
  @IsOptional()
  status: ProjectStatus;

  @IsOptional()
  owner: number;
}
