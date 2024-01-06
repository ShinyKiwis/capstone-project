import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private usersRepository: UsersRepository) {}
  async getAuthSession(
    session: Record<string, any>,
    createUserDto: CreateUserDto,
  ) {
    const user = await this.usersRepository.updateOrCreateAUser(createUserDto);
    session.authenticated = true;
    session.user = user;
    return session;
  }
}
