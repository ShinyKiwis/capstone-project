import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AssignRolesDto } from './dto/assign-role.dto';
import { CreateStudentDto } from '../students/dto/create-student.dto';
import { EnrollProjectDto } from '../students/dto/enroll-project.dto';
import { UnenrollProjectDto } from '../students/dto/unenroll-project.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    updateOrCreateAUser(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    create(createStudentDto: CreateStudentDto): Promise<import("./entities/user.entity").User>;
    enrollToAProject(enrollProjectDto: EnrollProjectDto): Promise<void>;
    unenrollFromAProject(unenrollProjectDto: UnenrollProjectDto): Promise<import("../students/entities/student.entity").Student>;
    findAll(): string;
    getAllInstructors(): Promise<import("./entities/user.entity").User[]>;
    assignRoles(id: string, assignRolesDto: AssignRolesDto): Promise<import("./entities/user.entity").User>;
    getAUser(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: string): string;
}
