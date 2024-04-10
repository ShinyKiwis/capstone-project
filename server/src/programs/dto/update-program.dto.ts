import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateProgramDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  major: string;

  @IsOptional()
  description: string;
}