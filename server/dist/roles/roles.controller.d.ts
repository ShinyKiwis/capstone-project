import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    createARole(createRoleDto: CreateRoleDto): Promise<import("./entities/role.entity").Role>;
    getAllRoles(): Promise<import("./entities/role.entity").Role[]>;
    findOne(id: string): string;
    update(id: string, updateRoleDto: UpdateRoleDto): string;
    deleteARole(id: string): Promise<void>;
}
