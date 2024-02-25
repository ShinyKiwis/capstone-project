import { IsOptional, IsString } from 'class-validator';

export class GetUsersFilterDto {
  @IsOptional()
  @IsString()
  search: string;
  
  @IsOptional()
  roles: number[];

  @IsOptional()
  limit: number;

  @IsOptional()
  page: number;
}
