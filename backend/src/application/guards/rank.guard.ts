import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Ranks } from "../decorators/rank.decorator";


@Injectable()
export class RankGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRanks = this.reflector.get(Ranks, context.getHandler());

        if(!requiredRanks) return true;
        const request = context.switchToHttp().getRequest();
        const userRank = request.user.level;
        
        if(!this.matchesRanks(userRank, requiredRanks)) {
            throw new UnauthorizedException("Error: insufficient access level for this resource.");
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