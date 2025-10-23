import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IsSelfAllowed, Ranks } from "../decorators/rank.decorator";
import { UserService } from "src/domain/services/user.service";


@Injectable()
export class RankGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRanks = this.reflector.get(Ranks, context.getHandler());

        if(!requiredRanks) return true;
        const request = context.switchToHttp().getRequest();
        const userId = request.user.userId;
        
        // Allows access if it's the user themselves and the route has IsSelfAllowed
        const targetUser = request.params.id;
        const isSelfAllowed = this.reflector.get(IsSelfAllowed, context.getHandler());
        if(isSelfAllowed && userId == targetUser) return true;   
        
        // Otherwise, checks if the user has the required rank
        const user = await this.userService.showUserById(userId);
        const userRank = user.level;

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