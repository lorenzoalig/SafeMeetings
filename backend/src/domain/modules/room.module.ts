import { Module } from "@nestjs/common";
import { RoomController } from "../controllers/room.controller";


@Module({
    imports: [],
    controllers: [RoomController],
    providers: []
})
export class RoomModule {}