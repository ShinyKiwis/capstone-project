import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesRepository } from './roles.repository';
import { Role } from './entities/role.entity';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: RolesRepository);
    createARole(createRoleDto: CreateRoleDto): Promise<Role>;
    getAllRoles(): Promise<Role[]>;
    findOne(id: number): string;
    update(id: number, updateRoleDto: UpdateRoleDto): string;
    deleteARole(id: number): Promise<void>;
}
