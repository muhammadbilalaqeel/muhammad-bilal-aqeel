import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
     const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
  //  console.log(authHeader)
    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }
    
   const token = authHeader.replace(/^Bearer\s+/i, '');  // "Bearer <token>"
    // console.log(token)
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      request.user = decoded; // attach payload to request
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
