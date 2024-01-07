import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getAuthSession(createUserDto: CreateUserDto, session: Record<string, any>): Promise<Record<string, any>>;
}
