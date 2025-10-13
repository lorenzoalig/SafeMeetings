import { Injectable, NotImplementedException } from "@nestjs/common";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { UserResponseDto } from "../dtos/user/user-response.dto";
import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UpdateUserDto } from "../dtos/user/update-user.dto";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async showAllUsers(): Promise<UserResponseDto[]> {
        return await this.userRepository.findAllUsers();
    }

    async showSingleUser(id: number): Promise<UserResponseDto> {
        return await this.userRepository.findUserById(id);
    }

    async createUser(dto: CreateUserDto): Promise<UserResponseDto> {
        return await this.userRepository.addUser(dto);
    }

    async updateUser(id: number, dto: UpdateUserDto): Promise<UserResponseDto> {
        return await this.userRepository.updateUser(id, dto);
    }

    async removeUser(id: number) {
        return await this.userRepository.deleteUser(id);
    }
}