import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Student } from './entities/student.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { EnrollProjectDto } from './dto/enroll-project.dto';
import { ProjectsRepository } from 'src/projects/projects.repository';
import { AssignRolesDto } from './dto/assign-role.dto';
export declare class UsersRepository extends Repository<User> {
    private dataSource;
    constructor(dataSource: DataSource);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    getUserById(id: number): Promise<User>;
    updateOrCreateAUser(createUserDto: CreateUserDto): Promise<User>;
    assignRoles(id: number, assignRolesDto: AssignRolesDto): Promise<User>;
}
export declare class StudentsRepository extends Repository<Student> {
    private dataSource;
    private userRepository;
    private projectRepository;
    constructor(dataSource: DataSource, userRepository: UsersRepository, projectRepository: ProjectsRepository);
    createStudent(createStudentDto: CreateStudentDto): Promise<User>;
    getStudentById(id: number): Promise<Student>;
    enrollProject(enrollProjectDto: EnrollProjectDto): Promise<void>;
}
