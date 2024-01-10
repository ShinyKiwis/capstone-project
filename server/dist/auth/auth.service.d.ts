import { BranchesRepository } from 'src/programs/branches.repository';
import { MajorsRepository } from 'src/programs/majors.repository';
import { StudentsRepository } from 'src/students/students.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
export declare class AuthService {
    private usersRepository;
    private branchesRepository;
    private majorsRepository;
    private studentsRepository;
    constructor(usersRepository: UsersRepository, branchesRepository: BranchesRepository, majorsRepository: MajorsRepository, studentsRepository: StudentsRepository);
    getAuthSession(session: Record<string, any>, createUserDto: CreateUserDto): Promise<Record<string, any>>;
}
