import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, NotImplementedException } from "@nestjs/common";
import { UserResponseDto } from "src/domain/dtos/user/user-response.dto";
import { DataBaseService } from "../services/database.service";
import { UserMapper } from "../mappers/user.mappers";
import { CreateUserDto } from "src/domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "src/domain/dtos/user/update-user.dto";
import { Prisma } from "generated/prisma-client";


@Injectable()
export class UserRepository {
    constructor(
        private readonly dataBaseService: DataBaseService,
        private readonly userMapper: UserMapper
    ) {}

    /**
     * Fetches a single user on the database
     * @param userId the user's id
     * @returns a UserResponseDto of the user
     */
    async findUserById(userId: number): Promise<UserResponseDto> {
        const user = await this.dataBaseService.user.findUnique({
            where: {
                id: userId,
                deletedAt: null
            }
        });

        if(!user) throw new NotFoundException("Error: user not found.");
        return this.userMapper.mapPrismaToUserResponseDto(user);
    }

    /**
     * Fetches all users on the database (that have not been deleted)
     * @returns a UserResponseDto array of every user
     */
    async findAllUsers(): Promise<UserResponseDto[]> {
        const users = await this.dataBaseService.user.findMany({
            where: {deletedAt: null}
        })
        
        if(users.length == 0) throw new NotFoundException("Error: no users registered in the database.")
        return users.map(user => this.userMapper.mapPrismaToUserResponseDto(user));
    }

    /**
     * Creates an user on the database
     * @param dto a UserCreationDto for the new user
     * @returns a UserResponseDto of the created user
     */
    async addUser(dto: CreateUserDto): Promise<UserResponseDto> {
        const prismaInput = this.userMapper.mapCreateUserDtoToPrismaInput(dto);

        try {
            const user = await this.dataBaseService.user.create({
                data: prismaInput
            });
            return this.userMapper.mapPrismaToUserResponseDto(user);
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) {
                if(error.code == "P2002")
                    throw new InternalServerErrorException(`Error: an user with this ${error.meta?.target} already exists.`);
            }    
            throw new InternalServerErrorException(error.message);
        }
    }

    /**
     * Updates a user on the database with provided data
     * @param userId the user's id
     * @param dto a UserUpdateDto with the alterations
     * @returns a UserResponseDto with the updated user
     */
    async updateUser(userId:number, dto: UpdateUserDto): Promise<UserResponseDto> {
        const prismaInput = this.userMapper.mapUpdateUserDtoToPrimsaInput(dto);
        const user = await this.dataBaseService.user.update({
            where: {
                id: userId,
                deletedAt: null
            },
            data: prismaInput
        });

        if(!user) throw new InternalServerErrorException("Error: user could not be updated.");
        return this.userMapper.mapPrismaToUserResponseDto(user);
    }

    /**
     * Deletes an user on the database (flags with deletedAt field)
     * @param userId the user's id
     * @returns a UserResponseDto of the deleted user
     */
    async deleteUser(userId: number): Promise<UserResponseDto> {    // FIXME: This version gives more precise error messages, but
        const user = await this.dataBaseService.user.findUnique({   // could be done with single prisma delete operation.
            where: {id: userId}
        });

        if(!user) throw new NotFoundException("Error: user not found.");

        if(user.deletedAt != null) throw new BadRequestException("Error: user is already deleted.");
        const deletedUser = await this.dataBaseService.user.update({
            where: {id: userId},
            data: {deletedAt: new Date()}
        });
        
        if(!deletedUser) throw new InternalServerErrorException("Error: user could not be deleted.");
        return this.userMapper.mapPrismaToUserResponseDto(deletedUser);
    }
}