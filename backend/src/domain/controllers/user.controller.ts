import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "../services/user.service";


@Controller("users")
export class UserController {
    constructor(private readonly userService : UserService) {}

    @Get()
    getUsers() {
        return this.userService.showUsers();
    }

    @Get(":id")
    getUser(@Param("id") id: number) {
        return this.userService.showSingleUser(id);
    }

    @Post()
    postUser(@Body() data: any) {
        return this.userService.createUser(data);
    }

    @Put(":id")
    putUser(@Param("id") id: number, @Body() data: any) {
        return this.userService.updateUser(id, data);
    }

    @Delete(":id")
    deleteUser(@Param("id") id: number) {
        return this.userService.removeUser(id);
    }
}