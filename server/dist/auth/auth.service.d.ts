import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
export declare class AuthService {
    private usersRepository;
    constructor(usersRepository: UsersRepository);
    getAuthSession(session: Record<string, any>, createUserDto: CreateUserDto): Promise<Record<string, any>>;
}
