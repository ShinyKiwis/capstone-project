import { IsOptional } from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class CreateUserDto {
  id: number;
  email: string;
  username: string;
  name: string;
}
