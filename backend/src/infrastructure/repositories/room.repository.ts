import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { DataBaseService } from "../services/database.service";
import { RoomResponseDto } from "src/domain/dtos/room/room-response.dto";
import { RoomMapper } from "../mappers/room.mapper";
import { CreateRoomDto } from "src/domain/dtos/room/create-room.dto";
import { UpdateRoomDto } from "src/domain/dtos/room/update-room.dto";


@Injectable()
export class RoomRepository {
    constructor(
        private readonly dataBaseService: DataBaseService,
        private readonly roomMapper: RoomMapper
    ) {}

    /**
     * Fetches a single room by UUID from the database
     * @param roomId the room's UUID
     * @returns the room' response dto
     */
    async findRoomById(roomId: string): Promise<RoomResponseDto> {
        const room = await this.dataBaseService.room.findUnique({
            where: {
                id: roomId,
                deletedAt: null
            }
        });

        if(!room) throw new NotFoundException("Error: room not found.");
        return this.roomMapper.mapPrismaToRoomResponseDto(room);
    }

    /**
     * Fetches all active rooms from the database
     * @returns a room response dto array of every room in the database
     */
    async findAllRooms(): Promise<RoomResponseDto[]> {
        const rooms = await this.dataBaseService.room.findMany({
            where: {deletedAt: null}
        });

        if(!rooms) throw new NotFoundException("Error: no rooms registered in the database.");
        return rooms.map(room => this.roomMapper.mapPrismaToRoomResponseDto(room));
    }

    /**
     * Adds a room to the database
     * @param dto create room dto with the data
     * @returns the new room's response dto
     */
    async addRoom(dto: CreateRoomDto): Promise<RoomResponseDto> {
        const prismaInput = this.roomMapper.mapCreateRoomDtoToPrismaInput(dto);
        const room = await this.dataBaseService.room.create({
            data: prismaInput
        });

        if(!room) throw new InternalServerErrorException("Error communicating with the database. Could not create room.");
        return this.roomMapper.mapPrismaToRoomResponseDto(room);
    }

    /**
     * Updates a room in the database
     * @param roomId the room's UUID
     * @param dto the update room dto with the new data
     * @returns the updated room's response dto
     */
    async updateRoom(roomId: string, dto: UpdateRoomDto): Promise<RoomResponseDto> {
        const prismaInput = this.roomMapper.mapUpdateRoomDtoToPrismaInput(dto);
        const room = await this.dataBaseService.room.update({
            where: {
                id: roomId,
                deletedAt: null
            },
            data: prismaInput
        });

        if(!room) throw new InternalServerErrorException("Error communicating to the database. Could not update room.");
        return this.roomMapper.mapPrismaToRoomResponseDto(room);
    }

    /**
     * Deletes a room on the database (flags with deletedAt field)
     * @param roomId the room's UUID
     * @returns the deleted room's response dto
     */
    async deleteRoom(roomId: string): Promise<RoomResponseDto> {    // FIXME: This version gives more precise error messages, but
        const room = await this.dataBaseService.room.findUnique({   // could be done with single prisma delete operation.
            where: {id: roomId}
        });

        if(!room) throw new NotFoundException("Error: room not found.");
        
        if(room.deletedAt != null) throw new BadRequestException("Error: room is already deleted.");
        const deletedRoom = await this.dataBaseService.room.update({
            where: {id: roomId},
            data: {deletedAt: new Date()}
        });

        if(!deletedRoom) throw new InternalServerErrorException("Error communicating to the database. Could not delete room.");
        return this.roomMapper.mapPrismaToRoomResponseDto(deletedRoom);
    }
}