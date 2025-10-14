import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorization = request.header.authorization;
        const token = authorization.splice([' '])[1];

        if(!token) throw new BadRequestException("Error: no token provided.");

        try{
            const payload = await this.jwtService.verifyAsync(token);
            request.user = {
                userId: payload.sub,
                email: payload.email
            }
            return true;
        } catch(error) {
            throw new UnauthorizedException("Error: access denied.");
        }
    }
}