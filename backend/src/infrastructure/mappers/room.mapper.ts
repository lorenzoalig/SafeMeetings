import { Injectable } from "@nestjs/common";
import { Prisma, Room } from "generated/prisma-client";
import { CreateRoomDto } from "src/domain/dtos/room/create-room.dto";
import { RoomResponseDto } from "src/domain/dtos/room/room-response.dto";
import { UpdateRoomDto } from "src/domain/dtos/room/update-room.dto";





@Injectable()
export class RoomMapper {
    mapPrismaToRoomResponseDto(prismaRoom: Room): RoomResponseDto {
        const dto: RoomResponseDto = {
            id: prismaRoom.id,
            description: prismaRoom.description!,
            accessLevel: prismaRoom.accessLevel,
            is_blocked: prismaRoom.is_blocked
        }
        return dto;
    }

    mapCreateRoomDtoToPrismaInput(dto: CreateRoomDto): Prisma.RoomCreateInput {
        const prismaInput: Prisma.RoomCreateInput = {
            description: dto.description,
            accessLevel: dto.accessLevel
        }
        return prismaInput;
    }

    mapUpdateRoomDtoToPrismaInput(dto: UpdateRoomDto): Prisma.RoomUpdateInput {
        const prismaInput: Prisma.RoomUpdateInput = {
            description: dto.description,
            accessLevel: dto.accessLevel,
            is_blocked: dto.is_blocked
        }
        return prismaInput;
    }
}