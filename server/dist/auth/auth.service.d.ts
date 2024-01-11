import { BranchesRepository } from '../programs/branches.repository';
import { MajorsRepository } from '../programs/majors.repository';
import { StudentsRepository } from '../students/students.repository';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersRepository } from '../users/users.repository';
export declare class AuthService {
    private usersRepository;
    private branchesRepository;
    private majorsRepository;
    private studentsRepository;
    constructor(usersRepository: UsersRepository, branchesRepository: BranchesRepository, majorsRepository: MajorsRepository, studentsRepository: StudentsRepository);
    getAuthSession(session: Record<string, any>, createUserDto: CreateUserDto): Promise<Record<string, any>>;
}
