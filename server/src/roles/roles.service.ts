import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesRepository } from './roles.repository';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(private rolesRepository: RolesRepository) {}

  async createARole(createRoleDto: CreateRoleDto): Promise<Role> {
    return this.rolesRepository.createRole(createRoleDto);
  }

  async getAllRoles(): Promise<Role[]> {
    return this.rolesRepository.find({ relations: { resources: true } });
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  async deleteARole(id: number) {
    const result = await this.rolesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with Id "${id}" not found`);
    }
  }
}
