import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { RoomService } from "src/domain/services/room.service";
import { UserService } from "src/domain/services/user.service";




@Injectable()
export class EnterRoomGuard implements CanActivate {
    constructor(
        private readonly roomService: RoomService,
        private readonly userService: UserService
    ) {}

    async canActivate(context : ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const roomId = request.params.id;
        const room = await this.roomService.showSingleRoom(roomId);
        const user = await this.userService.showUserById(request.user.userId);
        
        if(user.level < room.accessLevel) throw new ForbiddenException("Error: Error: insufficient access level for this room.");
        return true;
    }
}