import { IsEnum } from "class-validator";
import { ProjectStatus } from "../project-status.enum";

export class GetProjectsByStatusDto {
  @IsEnum(ProjectStatus)
  status: ProjectStatus
}