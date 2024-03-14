import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    console.log("hahaha")
    // let result;
    // try {
    const result = (await super.canActivate(context)) as boolean;
    // } catch (err) {
    //   console.log("error")
    //   console.log(err);
    // }
    console.log("hihihi request bb");
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    await super.logIn(request);
    return result;
  }
}