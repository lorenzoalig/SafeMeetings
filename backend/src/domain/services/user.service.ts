import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { UserResponseDto } from "../dtos/user/user-response.dto";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";
import { UserMapper } from "src/infrastructure/mappers/user.mappers";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService {

    // Number of rounds bcrypt will encrypt each password over (2^rounds)
    saltRounds: number = 12;

    constructor(
        private readonly userRepository: UserRepository,
        private readonly userMapper: UserMapper
    ) {}

    /**
     * Shows all users
     * @returns user response dto array of all active users
     */
    async showAllUsers(): Promise<UserResponseDto[]> {
        const users = await this.userRepository.findAllUsers();

        if(users.length == 0) throw new NotFoundException("Error: no users have been registered.");
        return users.map(user => this.userMapper.mapPrismaToUserResponseDto(user));
    }

    /**
     * Shows a single user
     * @param id the user's id
     * @returns the user's response dto
     */
    async showUserById(id: number): Promise<UserResponseDto> {
        const user = await this.userRepository.findUserById(id);
        
        if(!user) throw new NotFoundException("Error: user not found.");
        return this.userMapper.mapPrismaToUserResponseDto(user);
    }

    /**
     * Shows a single user by email
     * @param email the user's email
     * @returns the user's response dto
     */
    async showUserByEmail(email: string): Promise<UserResponseDto> {
        const user = await this.userRepository.findUserByEmail(email);
        
        if(!user) throw new NotFoundException("Error: user not found.");
        return this.userMapper.mapPrismaToUserResponseDto(user);
    }

    /**
     * Creates a new user
     * @param dto create user dto with the data
     * @returns the new user's response dto
     */
    async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
        const hashed = await bcrypt.hash(dto.password, this.saltRounds);
        
        if(!hashed) throw new InternalServerErrorException("Error: could not hash password.")
        dto.password = hashed;
        const user = await this.userRepository.addUser(dto);

        if(!user) throw new InternalServerErrorException("Error: user could not be created.");
        return this.userMapper.mapPrismaToUserResponseDto(user);
    }

    /**
     * Updates an existing user
     * @param id the user's id
     * @param dto updater user dto with the new data
     * @returns the updated user's response dto
     */
    async updateUser(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
        const user = await this.userRepository.updateUser(id, dto);
        
        if(!user) throw new InternalServerErrorException("Error: user could not be updated.");
        return this.userMapper.mapPrismaToUserResponseDto(user);
    }

    /**
     * Deletes a user (deactivates)
     * @param id the user's id
     * @returns the deleted user's response dto
     */
    async removeUser(id: number): Promise<UserResponseDto> {
        const user = await this.userRepository.findUserById(id);

        if(!user) throw new NotFoundException("Error: user not found.");

        if(user.deletedAt != null) throw new BadRequestException("Error: user is already deleted.");
        const deletedUser = await this.userRepository.deleteUser(id);
        
        if(!deletedUser) throw new InternalServerErrorException("Error: user could not be deleted.");
        return this.userMapper.mapPrismaToUserResponseDto(deletedUser);
    }
}