import { BranchesRepository } from 'src/programs/branches.repository';
import { MajorsRepository } from 'src/programs/majors.repository';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
export declare class AuthService {
    private usersRepository;
    private branchesRepository;
    private majorsRepository;
    constructor(usersRepository: UsersRepository, branchesRepository: BranchesRepository, majorsRepository: MajorsRepository);
    getAuthSession(session: Record<string, any>, createUserDto: CreateUserDto): Promise<Record<string, any>>;
}
