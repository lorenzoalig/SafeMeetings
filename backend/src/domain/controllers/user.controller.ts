import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserResponseDto } from "../dtos/user/user-response.dto";


@Controller("users")
export class UserController {
    constructor(private readonly userService : UserService) {}
    
    /**
     * Route for getting all users
     * @returns response dto array of all active user
     */
    @Get()
    async getUsers() {
        return await this.userService.showAllUsers();
    }

    /**
     * Route for getting a single user
     * @param id the user's id
     * @returns the user response dto
     */
    @Get(":id")
    async getUser(@Param("id") id: number) {
        return await this.userService.showSingleUser(+id);
    }

    /**
     * Route for creating a new user
     * @param data create user dto with user data
     * @returns the user's response dto
     */
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

    /**
     * Route for updating an existing user
     * @param id the user's id
     * @param data update user dto with new data
     * @returns the updates user's response dto
     */
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

    /**
     * Route for deleting a user
     * @param id the user's id
     * @returns the deleted user's response dto
     */
    @Delete(":id")
    async deleteUser(@Param("id") id: number) {
        return await this.userService.removeUser(+id);
    }
}