import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { RoomService } from "../services/room.service";
import { UpdateRoomDto } from "../dtos/room/update-room.dto";
import { CreateRoomDto } from "../dtos/room/create-room.dto";
import { AuthGuard } from "src/application/guards/auth.guard";
import { Ranks } from "src/application/decorators/rank.decorator";
import { RankGuard } from "src/application/guards/rank.guard";
import { EnterRoomGuard } from "src/application/guards/enter-room.guard";
import { Request } from "express";


@Controller("room")
@UseGuards(AuthGuard)
export class RoomController {
    constructor(private readonly roomService: RoomService) {}

    /**
     * Route for entering a room
     * @access authenticated user with sufficient access level
     * @param id the room's UUID
     */
    @Post("enter/:id")
    @UseGuards(AuthGuard, EnterRoomGuard)
    enterRoom(
        @Param("id") roomId: string,
        @Req() request
    ) {
        const userId = request.user.userId;
        this.roomService.joinRoom(userId, roomId);
    }

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
    @Ranks([5])
    @UseGuards(RankGuard)
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
    @Ranks([5])
    @UseGuards(RankGuard)
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
    @Ranks([5])
    @UseGuards(RankGuard)
    lockRoom(@Param("id") id: string) {
        this.roomService.toggleRoomLock(id);
    }

    /**
     * Route for deleting a room
     * @param id the room's UUID
     * @returns the deleted room's response dto
     */
    @Delete(":id")
    @Ranks([5])
    @UseGuards(RankGuard)
    deleteRoom(@Param("id") id: string) {
        return this.roomService.removeRoom(id);
    }
}