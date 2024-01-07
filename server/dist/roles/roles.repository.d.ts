import { DataSource, Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RolesRepository extends Repository<Role> {
    private dataSource;
    constructor(dataSource: DataSource);
    createRole(createRoleDto: CreateRoleDto): Promise<Role>;
}
