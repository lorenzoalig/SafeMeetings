import { Module } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { RoomRepository } from "../repositories/room.repository";
import { UserMapper } from "../mappers/user.mappers";
import { RoomMapper } from "../mappers/room.mapper";
import { DataBaseModule } from "./database.module";
import { AccessRepository } from "../repositories/access.repository";


@Module({
    imports: [DataBaseModule],
    providers: [
        UserRepository, UserMapper, RoomMapper, RoomRepository, AccessRepository
    ],
    exports: [
        UserRepository, UserMapper, RoomMapper, RoomRepository, AccessRepository
    ]
})
export class InfrastructureModule {}