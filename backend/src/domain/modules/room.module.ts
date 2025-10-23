import { Module } from "@nestjs/common";
import { RoomController } from "../controllers/room.controller";
import { RoomService } from "../services/room.service";
import { DataBaseModule } from "src/infrastructure/modules/database.module";
import { UserModule } from "./user.module";
import { InfrastructureModule } from "src/infrastructure/modules/infrastructure.module";
import { EnterRoomGuard } from "src/application/guards/enter-room.guard";


@Module({
    imports: [UserModule, InfrastructureModule],
    controllers: [RoomController],
    providers: [RoomService, EnterRoomGuard]
})
export class RoomModule {}