import { Injectable, NotImplementedException } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { UserResponseDto } from "../dtos/user/user-response.dto";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    /**
     * Shows all users
     * @returns user response dto array of all active users
     */
    async showAllUsers(): Promise<UserResponseDto[]> {
        return await this.userRepository.findAllUsers();
    }

    /**
     * Shows a single user
     * @param id the user's id
     * @returns the user's response dto
     */
    async showSingleUser(id: number): Promise<UserResponseDto> {
        return await this.userRepository.findUserById(id);
    }

    /**
     * Creates a new user
     * @param dto create user dto with the data
     * @returns the new user's response dto
     */
    async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
        return await this.userRepository.addUser(dto);
    }

    /**
     * Updates an existing user
     * @param id the user's id
     * @param dto updater user dto with the new data
     * @returns the updated user's response dto
     */
    async updateUser(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
        return await this.userRepository.updateUser(id, dto);
    }

    /**
     * Deletes a user (deactivates)
     * @param id the user's id
     * @returns the deleted user's response dto
     */
    async removeUser(id: number) {
        return await this.userRepository.deleteUser(id);
    }
}