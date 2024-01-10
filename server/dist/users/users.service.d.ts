import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { AssignRolesDto } from './dto/assign-role.dto';
import { StudentsRepository } from 'src/students/students.repository';
import { CreateStudentDto } from 'src/students/dto/create-student.dto';
import { EnrollProjectDto } from 'src/students/dto/enroll-project.dto';
export declare class UsersService {
    private usersRepository;
    private studentsRepository;
    constructor(usersRepository: UsersRepository, studentsRepository: StudentsRepository);
    createAUser(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    createAStudentUser(createStudentDto: CreateStudentDto): Promise<import("./entities/user.entity").User>;
    getAllInstructors(): Promise<import("./entities/user.entity").User[]>;
    findAll(): string;
    getAUser(id: number): Promise<import("./entities/user.entity").User>;
    updateOrCreateAUser(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    enrollToAProject(enrollProjectDto: EnrollProjectDto): Promise<void>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
    assignRoles(id: number, assignRolesDto: AssignRolesDto): Promise<import("./entities/user.entity").User>;
}
