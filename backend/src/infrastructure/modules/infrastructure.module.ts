import { Module } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { RoomRepository } from "../repositories/room.repository";
import { UserMapper } from "../mappers/user.mappers";
import { RoomMapper } from "../mappers/room.mapper";
import { DataBaseModule } from "./database.module";


@Module({
    imports: [DataBaseModule],
    providers: [
        UserRepository, UserMapper, RoomMapper, RoomRepository
    ],
    exports: [
        UserRepository, UserMapper, RoomMapper, RoomRepository
    ]
})
export class InfrastructureModule {}