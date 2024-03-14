import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username', // Specify the field in the DTO for username
      passwordField: null,
      passReqToCallback: true,
    });
  }
  async validate(req): Promise<any> {
    console.log('hahahihihi');
    console.log(req);
    console.log('validating');
    const user = await this.authService.getUser(req.body);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
