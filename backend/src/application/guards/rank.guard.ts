import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IsSelfAllowed, Ranks } from "../decorators/rank.decorator";


@Injectable()
export class RankGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRanks = this.reflector.get(Ranks, context.getHandler());

        if(!requiredRanks) return true;
        const request = context.switchToHttp().getRequest();
        const targetUser = request.params.id;
        const isSelfAllowed = this.reflector.get(IsSelfAllowed, context.getHandler());

        // Allows access if it is the user itself and the route is IsSelfAllowed
        if(isSelfAllowed && request.user.id == targetUser) return true;       
        const userRank = request.user.level;

        if(!this.matchesRanks(userRank, requiredRanks)) {
            throw new ForbiddenException("Error: insufficient access level for this resource.");
        }
        return true;
    }

    matchesRanks(userRank: number, required: number[]): boolean {
        for(const rank of required) {
            if(userRank == rank) return true;
        } 
        return false;
    }    
}