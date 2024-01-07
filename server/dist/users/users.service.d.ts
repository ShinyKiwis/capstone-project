import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentsRepository, UsersRepository } from './users.repository';
import { EnrollProjectDto } from './dto/enroll-project.dto';
import { AssignRolesDto } from './dto/assign-role.dto';
export declare class UsersService {
    private usersRepository;
    private studentsRepository;
    constructor(usersRepository: UsersRepository, studentsRepository: StudentsRepository);
    createAUser(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    createAStudentUser(createStudentDto: CreateStudentDto): Promise<import("./entities/user.entity").User>;
    findAll(): string;
    getAUser(id: number): Promise<import("./entities/user.entity").User>;
    updateOrCreateAUser(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    enrollToAProject(enrollProjectDto: EnrollProjectDto): Promise<void>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    assignRoles(id: number, assignRolesDto: AssignRolesDto): Promise<import("./entities/user.entity").User>;
}
