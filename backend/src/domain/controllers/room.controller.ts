import { Body, Controller, Delete, Get, Param, Patch, Post, Put, ValidationPipe } from "@nestjs/common";
import { RoomService } from "../services/room.service";
import { UpdateRoomDto } from "../dtos/room/update-room.dto";
import { CreateRoomDto } from "../dtos/room/create-room.dto";


@Controller("rooms")
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    /**
     * Route for getting all rooms
     * @returns room response dto array with all rooms
     */
    @Get()
    getRooms() {
        return this.roomService.showRooms();
    }

    /**
     * Route for getting a single room
     * @param id the room's UUID
     * @returns the room's response dto
     */
    @Get(":id")
    getRoom(@Param("id") id: string) {
        return this.roomService.showSingleRoom(id);
    }

    /**
     * Route for creating a new room
     * @param dto create room dto with the data
     * @returns the new room's response dto
     */
    @Post()
    postRoom(
        @Body(new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true
        })) dto: CreateRoomDto
    ) {
        return this.roomService.createRoom(dto);
    }

    /**
     * Route for updating a room
     * @param id the room's UUID
     * @param dto update room dto with the new data
     * @returns the updated room's response dto
     */
    @Put(":id")
    putRoom(
        @Param("id") id: string, 
        @Body(new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true
        })) dto: UpdateRoomDto
    ) {
        return this.roomService.replaceRoom(id, dto);
    }

    /**
     * Route for blocking access to a room
     * Toggles between locked/unlocked
     * @param id the room's UUID
     */
    @Patch()
    lockRoom(@Param("id") id: string) {
        this.roomService.toggleRoomLock(id);
    }

    /**
     * Route for deleting a room
     * @param id the room's UUID
     * @returns the deleted room's response dto
     */
    @Delete(":id")
    deleteRoom(@Param("id") id: string) {
        return this.roomService.removeRoom(id);
    }
}