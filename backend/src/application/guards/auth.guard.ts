import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        const token = authorization?.split([' '])[1] ?? null;   // Bearer <token>

        if(!token) throw new BadRequestException("Error: no token provided.");

        try{
            const payload = await this.jwtService.verifyAsync(token);
            request.user = {
                userId: payload.sub,
                email: payload.email
            }
            return true;
        } catch(error) {
            throw new UnauthorizedException("Error: access denied due to invalid token.");
        }
    }
}