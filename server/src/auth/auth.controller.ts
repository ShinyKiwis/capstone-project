import { Body, Controller, Post, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async getAuthSession(
    @Body() createUserDto: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    console.log(session);
    console.log(session.id);
    console.log(createUserDto);
    return this.authService.getAuthSession(session, createUserDto);
    // session.authenticated = true;
    // return session;
  }
}
