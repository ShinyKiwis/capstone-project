import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    console.log("hihihi");
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
