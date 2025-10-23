import { Injectable, NotImplementedException } from "@nestjs/common";
import { RoomRepository } from "src/infrastructure/repositories/room.repository";
import { RoomResponseDto } from "../dtos/room/room-response.dto";
import { CreateRoomDto } from "../dtos/room/create-room.dto";
import { UpdateRoomDto } from "../dtos/room/update-room.dto";
import { AccessRepository } from "src/infrastructure/repositories/access.repository";


// FIXME: Move all business logic from the repository to this service

@Injectable()
export class RoomService {
    constructor(
        private readonly roomRepository: RoomRepository,
        private readonly accessRepository: AccessRepository
    ) {}

    /**
     * Joins current user to a room
     * @param userId the user's id
     * @param roomId the room's id
     * @returns access entity (FOR NOW - to be a responseDto)
     */
    async joinRoom(userId: number, roomId: string) {
        const access = await this.accessRepository.registerAccess(userId, roomId);
        return access;
    }

    /**
     * Shows all rooms
     * @returns room response dto array with all rooms
     */
    async showRooms(): Promise<RoomResponseDto[]> {
        return await this.roomRepository.findAllRooms();
    }

    /**
     * Shows a single room
     * @param id the room's UUID
     * @returns the room's response dto
     */
    async showSingleRoom(id: string): Promise<RoomResponseDto> {
        return await this.roomRepository.findRoomById(id);
    }

    /**
     * Creates a new room
     * @param dto create room dto with the data
     * @returns the new room's reponse dto
     */
    async createRoom(dto: CreateRoomDto): Promise<RoomResponseDto> {
        return await this.roomRepository.addRoom(dto);
    }

    /**
     * Replaces a room for a new room
     * @param id the target room's UUID
     * @param dto update room dto with the new data
     * @returns the updated room's response dto
     */
    async replaceRoom(id: string, dto: UpdateRoomDto): Promise<RoomResponseDto> {
        return await this.roomRepository.updateRoom(id, dto);
    }

    /**
     * Toggles locking access to a certain room
     * @param id the room's UUID
     * @returns the target room's response dto
     */
    async toggleRoomLock(id: string) {
        const room = await this.roomRepository.findRoomById(id);
        const dto = {...room}

        if(room.is_blocked)
            dto.is_blocked = false;
        else
            dto.is_blocked = true;
        return await this.roomRepository.updateRoom(id, dto);
    }

    /**
     * Deletes a room (deactivates)
     * @param id the room's UUID
     * @returns the deleted room's response dto
     */
    async removeRoom(id: string): Promise<RoomResponseDto> {
        return await this.roomRepository.deleteRoom(id);
    }
}