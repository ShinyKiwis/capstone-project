import {
  Body,
  Controller,
  Get,
  Post,
  Req,
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
    console.log('session baby');
    // console.log(session);
    // console.log(session.id);
    // console.log(req);
    let userSession = await this.authService.getAuthSession(session);
    userSession.user = req.user;
    console.log(userSession);
    return userSession;
    // session.authenticated = true;
    // return session;
  }

  @Get()
  async getUser(@Session() session: Record<string, any>) {
    if (session.user) {
      let newUser = await this.authService.getUserById(session.user.id);
      console.log('hehehaha');
      console.log(newUser);
      console.log(session.user);
      const userKeys = Object.keys(session.user);
      const newUserKeys = Object.keys(newUser);
      if (userKeys.length !== newUserKeys.length) {
        session.user = newUser;
        return session;
      }
      for (let key of userKeys) {
        if (Array.isArray(session.user[key]) && Array.isArray(newUser[key])) {
          if (
            session.user[key].length !== newUser[key].length ||
            !session.user[key].every(
              (value: string, index: number) => value === newUser[key][index],
            )
          ) {
            session.user = newUser;
            return session;
          }
        } else if (session.user[key] !== newUser[key]) {
          console.log(key);
          session.user = newUser;
          return session;
        }
      }
    }
    return {};
  }
}
