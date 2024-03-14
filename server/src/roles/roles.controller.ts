import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  createARole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.createARole(createRoleDto);
  }

  @Get()
  async getAllRoles() {
    let result = await this.rolesService.getAllRoles();
    let roles = result.map((role) => {
      return {...role, resources : role.resources.map((resource) => resource.name)}
    })
    return roles;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  deleteARole(@Param('id') id: string) {
    return this.rolesService.deleteARole(+id);
  }
}
