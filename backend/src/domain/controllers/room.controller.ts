import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RoomService } from "../services/room.service";


@Controller("room")
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    @Get()
    getRooms() {
        return this.roomService.showRooms();
    }

    @Get(":id")
    getRoom(@Param("id") id: number) {
        return this.roomService.showSingleRoom(id);
    }

    @Post()
    postRoom(@Body() data: any) {
        return this.roomService.createRoom(data);
    }

    @Put(":id")
    putRoom(@Param("id") id: number, @Body() data: any) {
        return this.roomService.updateRoom(id, data);
    }

    @Delete(":id")
    deleteRoom(@Param("id") id: number) {
        return this.roomService.removeRoom(id);
    }
}