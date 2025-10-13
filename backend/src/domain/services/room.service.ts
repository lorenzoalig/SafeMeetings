import { Injectable, NotImplementedException } from "@nestjs/common";
import { RoomRepository } from "src/infrastructure/repositories/room.repository";
import { RoomResponseDto } from "../dtos/room/room-response.dto";
import { CreateRoomDto } from "../dtos/room/create-room.dto";
import { UpdateRoomDto } from "../dtos/room/update-room.dto";


@Injectable()
export class RoomService {
    constructor(private readonly roomRepository: RoomRepository) {}

    async showRooms(): Promise<RoomResponseDto[]> {
        return await this.roomRepository.findAllRooms();
    }

    async showSingleRoom(id: string): Promise<RoomResponseDto> {
        return await this.roomRepository.findRoomById(id);
    }

    async createRoom(dto: CreateRoomDto): Promise<RoomResponseDto> {
        return await this.roomRepository.addRoom(dto);
    }

    async replaceRoom(id: string, dto: UpdateRoomDto): Promise<RoomResponseDto> {
        return await this.roomRepository.updateRoom(id, dto);
    }

    async toggleRoomLock(id: string) {
        const room = await this.roomRepository.findRoomById(id);
        const dto = {...room}

        if(room.is_blocked)
            dto.is_blocked = false;
        else
            dto.is_blocked = true;
        return await this.roomRepository.updateRoom(id, dto);
    }

    async removeRoom(id: string): Promise<RoomResponseDto> {
        return await this.roomRepository.deleteRoom(id);
    }
}