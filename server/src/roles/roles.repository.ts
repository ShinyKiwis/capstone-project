import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResourcesRepository } from 'src/resources/resources.repository';

@Injectable()
export class RolesRepository extends Repository<Role> {
  constructor(
    private dataSource: DataSource,
    private resourcesRepository: ResourcesRepository,
  ) {
    super(Role, dataSource.createEntityManager());
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    const { name, resources } = createRoleDto;
    console.log(resources);
    let mappedResources = await Promise.all(
      resources.map(async (resource) => {
        let name = await this.resourcesRepository.getOrCreateResource({
          name: resource,
        });
        console.log(name);
        return name;
      }),
    );
      console.log(mappedResources);
    const role = this.create({
      name,
      resources: mappedResources,
    });

    await this.save(role);

    return role;
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const { name, resources } = updateRoleDto;
    const role = await this.findOneBy({
      id,
    });
    let mappedResources = await Promise.all(
      resources.map(async (resource) => {
        let name = await this.resourcesRepository.getOrCreateResource({
          name: resource,
        });
        return name;
      }),
    );
    role.name = name;
    role.resources = mappedResources;
    this.save(role);
    return role;
  }
}
