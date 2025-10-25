import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe } from "@nestjs/common";
import { UserService } from "src/domain/services/user.service";
import { CreateUserDto } from "src/domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "src/domain/dtos/user/update-user.dto";
import { UserResponseDto } from "src/domain/dtos/user/user-response.dto";
import { UpdateUserLevelDto } from "src/domain/dtos/user/update-user-level.dto";
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
     * @returns UserResponseDto array of all active user
     */
    @Get()
    async getUsers(): Promise<UserResponseDto[]> {
        return await this.userService.showAllUsers();
    }

    /**
     * Route for getting a single user
     * @access authenticated users
     * @param id the user's id
     * @returns the user's UserResponseDto
     */
    @Get(":id")
    async getUser(@Param("id") id: number): Promise<UserResponseDto> {
        return await this.userService.showUserById(+id);
    }

    /**
     * Route for creating a new user
     * @access authenticated users with level 5
     * @param data CreateUserDto with user data
     * @returns the user's UserResponseDto
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
     * @access authenticated users with level 5 or the user himself
     * @param id the target user's id
     * @param data UpdateUserDto with new data
     * @returns the updated user's UserResponseDto
     */
    @Patch(":id")
    @Ranks([5])
    @IsSelfAllowed(true)
    @UseGuards(RankGuard)
    async patchUser(
        @Param("id") id: number,
        @Body(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true
            })
        ) data: UpdateUserDto
    ): Promise<UserResponseDto> {
        return await this.userService.updateUser(+id, data);
    }

    /**
     * Route for updating an existing user's access level
     * @access authenticated users with level 5
     * @param id the target user's id
     * @param dto UpdateUserLevelDto with the new level
     * @returns the updated user's UserResponseDto
     */
    @Patch(":id/level")
    @Ranks([5])
    //@UseGuards(RankGuard)
    patchLevel(
        @Param("id") id: number,
        @Body(
            new ValidationPipe({
                whitelist: true,
                forbidNonWhitelisted: true,
                transform: true
            })
        ) dto: UpdateUserLevelDto
    ) {
        return this.userService.updateUserLevel(+id, dto);
    }

    /**
     * Route for deleting a user
     * @access authenticated users with level 4 or 5
     * @param id the user's id
     * @returns the deleted user's UserResponseDto
     */
    @Delete(":id")
    @Ranks([4,5])
    @UseGuards(RankGuard)
    async deleteUser(@Param("id") id: number): Promise<UserResponseDto> {
        return await this.userService.removeUser(+id);
    }
}