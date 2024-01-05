import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';

@Injectable()
export class RolesRepository extends Repository<Role> {
  constructor(private dataSource: DataSource) {
    super(Role, dataSource.createEntityManager());
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, resources } = createRoleDto;
    const role = this.create({
      name,
      resources,
    });

    await this.save(role);

    return role;
  }
}
