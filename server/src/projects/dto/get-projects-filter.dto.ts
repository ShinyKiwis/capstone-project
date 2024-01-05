import { IsOptional, IsString } from 'class-validator';

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
}
