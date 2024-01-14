import { IsOptional } from "class-validator";

export class GetStudentsDto {
  @IsOptional()
  search: string;
}