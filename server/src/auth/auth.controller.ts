import {
  Body,
  Controller,
  Post,
  Request,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LocalAuthGuard } from './local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async getAuthSession(
    @Request() req: any,
    @Session() session: Record<string, any>,
  ) {
    console.log("session baby");
    console.log(session);
    console.log(session.id);
    console.log(req);
    let userSession = await this.authService.getAuthSession(session);
    userSession.user = req.user;
    return userSession;
    // session.authenticated = true;
    // return session;
  }
}
