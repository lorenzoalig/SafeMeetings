import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserResponseDto } from "../dtos/user/user-response.dto";
import { IsSelfAllowed, Ranks } from "src/application/decorators/rank.decorator";
import { RankGuard } from "src/application/guards/rank.guard";
import { AuthGuard } from "src/application/guards/auth.guard";


@Controller("users")
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService : UserService) {}
    
    /**
     * Route for getting all users
     * @access authenticated users
     * @returns response dto array of all active user
     */
    @Get()
    async getUsers(): Promise<UserResponseDto[]> {
        return await this.userService.showAllUsers();
    }

    /**
     * Route for getting a single user
     * @access authenticated users
     * @param id the user's id
     * @returns the user response dto
     */
    @Get(":id")
    async getUser(@Param("id") id: number): Promise<UserResponseDto> {
        return await this.userService.showUserById(+id);
    }

    /**
     * Route for creating a new user
     * @access authenticated users with rank 5
     * @param data create user dto with user data
     * @returns the user's response dto
     */
    @Post()
    @Ranks([5])
    @UseGuards(RankGuard)
    async postUser(
        @Body(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        })) data: CreateUserDto
    ): Promise<UserResponseDto> {
        return await this.userService.createUser(data);
    }

    /**
     * Route for updating an existing user
     * @access authenticated users with rank 5 or the user himself
     * @param id the user's id
     * @param data update user dto with new data
     * @returns the updates user's response dto
     */
    @Patch(":id")
    @Ranks([5])
    @IsSelfAllowed(true)
    @UseGuards(RankGuard)
    async patchUser(
        @Param("id") id: number,
        @Body(new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true
        })) data: UpdateUserDto
    ): Promise<UserResponseDto> {
        return await this.userService.updateUser(+id, data);
    }

    /**
     * Route for deleting a user
     * @access authenticated users with rank 4 or 5
     * @param id the user's id
     * @returns the deleted user's response dto
     */
    @Delete(":id")
    @Ranks([4,5])
    @UseGuards(RankGuard)
    async deleteUser(@Param("id") id: number): Promise<UserResponseDto> {
        return await this.userService.removeUser(+id);
    }
}