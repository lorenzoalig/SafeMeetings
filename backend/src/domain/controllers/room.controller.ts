import { Body, Controller, Delete, Get, Param, Patch, Post, Put, ValidationPipe } from "@nestjs/common";
import { RoomService } from "../services/room.service";
import { UpdateRoomDto } from "../dtos/room/update-room.dto";
import { CreateRoomDto } from "../dtos/room/create-room.dto";


@Controller("rooms")
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    getRooms() {
        return this.roomService.showRooms();
    }

    @Get(":id")
    getRoom(@Param("id") id: string) {
        return this.roomService.showSingleRoom(id);
    }

    @Post()
    postRoom(
        @Body(new ValidationPipe(
            {
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true
            }
        )) dto: CreateRoomDto
    ) {
        return this.roomService.createRoom(dto);
    }

    @Put(":id")
    putRoom(
        @Param("id") id: string, 
        @Body(new ValidationPipe(
            {
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true
            }
        )) dto: UpdateRoomDto
    ) {
        return this.roomService.replaceRoom(id, dto);
    }

    // Alterna entre bloqueada ou não a sala
    @Patch()
    lockRoom(@Param("id") id: string) {
        this.roomService.toggleRoomLock(id);
    }

    @Delete(":id")
    deleteRoom(@Param("id") id: string) {
        return this.roomService.removeRoom(id);
    }
}