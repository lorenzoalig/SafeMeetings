import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserResponseDto } from "../dtos/user/user-response.dto";


@Controller("users")
export class UserController {
    constructor(private readonly userService : UserService) {}
    
    @Get()
    async getUsers() {
        return await this.userService.showAllUsers();
    }

    @Get(":id")
    async getUser(@Param("id") id: number) {
        return await this.userService.showSingleUser(+id);
    }

    @Post()
    async postUser(
        @Body(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })) data: CreateUserDto
    ) {
        console.log("entrou");
        return await this.userService.createUser(data);
    }

    @Patch(":id")
    async patchUser(
        @Param("id") id: number,
        @Body(new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true
        })) data: UpdateUserDto
    ) {
        return await this.userService.updateUser(+id, data);
    }

    @Delete(":id")
    async deleteUser(@Param("id") id: number) {
        return await this.userService.removeUser(+id);
    }
}