import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { AssignRolesDto } from './dto/assign-role.dto';
export declare class UsersRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    getUserById(id: number): Promise<User>;
    updateOrCreateAUser(createUserDto: CreateUserDto): Promise<User>;
    assignRoles(id: number, assignRolesDto: AssignRolesDto): Promise<User>;
    getAllInstructors(): Promise<User[]>;
}
