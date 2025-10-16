import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataBaseService } from "../services/database.service";
import { UserMapper } from "../mappers/user.mappers";
import { CreateUserDto } from "src/domain/dtos/user/create-user.dto";
import { UpdateUserDto } from "src/domain/dtos/user/update-user.dto";
import { Prisma, User } from "generated/prisma-client";
import { UpdateUserLevelDto } from "src/domain/dtos/user/update-user-level.dto";


@Injectable()
export class UserRepository {
    constructor(
        private readonly dataBaseService: DataBaseService,
        private readonly userMapper: UserMapper
    ) {}

    /**
     * Fetches a single user on the database by id
     * @param userId the user's id
     * @returns a UserResponseDto of the user
     */
    async findUserById(userId: number): Promise<User | null> {
        return await this.dataBaseService.user.findUnique({
            where: {
                id: userId,
                deletedAt: null
            }
        });
    }

    /**
     * Fetches a single user on the database by email
     * @param email the user's email
     * @returns a UserResponseDto of the user
     */
    async findUserByEmail(email: string): Promise<User | null> {
        return await this.dataBaseService.user.findUnique({
            where: {
                email: email,
                deletedAt: null
            }
        });
    }

    /**
     * Fetches all users on the database (that have not been deleted)
     * @returns a UserResponseDto array of every user
     */
    async findAllUsers(): Promise<User[]> {
        return await this.dataBaseService.user.findMany({
            where: {deletedAt: null}
        })
    }

    /**
     * Creates an user on the database
     * @param dto a UserCreationDto for the new user
     * @returns a UserResponseDto of the created user
     */
    async addUser(dto: CreateUserDto): Promise<User> {
        const prismaInput = this.userMapper.mapCreateUserDtoToPrismaInput(dto);

        try {
            return await this.dataBaseService.user.create({
                data: prismaInput
            });
        } catch (error) {
            if(error instanceof Prisma.PrismaClientKnownRequestError) {        // FIXME: Do proper error handling through Exceptions Filter
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
    async updateUser(userId:number, dto: UpdateUserDto | UpdateUserLevelDto): Promise<User> {
        const prismaInput = this.userMapper.mapUpdateUserDtoToPrimsaInput(dto);
        return await this.dataBaseService.user.update({
            where: {
                id: userId,
                deletedAt: null
            },
            data: prismaInput
        });
    }

    /**
     * Deletes an user on the database (flags with deletedAt field)
     * @param userId the user's id
     * @returns a UserResponseDto of the deleted user
     */
    async deleteUser(userId: number): Promise<User | null> {
        return await this.dataBaseService.user.update({
            where: {id: userId},
            data: {deletedAt: new Date()}
        });
    }
}
