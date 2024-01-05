import { IsNotEmpty, IsString } from 'class-validator';
import { Resource } from 'src/resources/entities/resource.entity';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  resources: Resource[];
}
