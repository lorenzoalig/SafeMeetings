import { Module } from "@nestjs/common";
import { RoomController } from "../controllers/room.controller";
import { RoomService } from "../services/room.service";
import { RoomRepository } from "src/infrastructure/repositories/room.repository";
import { DataBaseModule } from "src/infrastructure/modules/database.module";
import { DataBaseService } from "src/infrastructure/services/database.service";
import { RoomMapper } from "src/infrastructure/mappers/room.mapper";


@Module({
    imports: [DataBaseModule],
    controllers: [RoomController],
    providers: [RoomService, RoomRepository, RoomMapper]
})
export class RoomModule {}