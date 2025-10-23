import { Injectable } from "@nestjs/common";
import { Prisma, User } from "generated/prisma-client";
import { CreateUserDto } from "src/domain/dtos/user/create-user.dto";
import { UpdateUserLevelDto } from "src/domain/dtos/user/update-user-level.dto";
import { UpdateUserDto } from "src/domain/dtos/user/update-user.dto";
import { UserResponseDto } from "src/domain/dtos/user/user-response.dto";


@Injectable()
export class UserMapper {
    mapPrismaToUserResponseDto(prismaUser: User) : UserResponseDto {
        const dto : UserResponseDto = {
            id: prismaUser.id,
            name: prismaUser.name,
            email: prismaUser.email,
            level: prismaUser.level,
            profile_img: prismaUser.profile_img
        }
        return dto;
    }

    mapCreateUserDtoToPrismaInput(dto: CreateUserDto): Prisma.UserCreateInput {
        const prismaUser: Prisma.UserCreateInput = {
            name: dto.name,
            email: dto.email,
            password: dto.password,
            profile_img: dto.profile_img
        }
        return prismaUser;
    }

    mapUpdateUserDtoToPrimsaInput(dto: UpdateUserDto | UpdateUserLevelDto): Prisma.UserUpdateInput {
        const prismaInput: Prisma.UserUpdateInput = {};

        if("level" in dto) {
            prismaInput.level = dto.level;
        } else {
            if(dto.name) prismaInput.name = dto.name;
            if(dto.email) prismaInput.email = dto.email;
            if(dto.password) prismaInput.password = dto.password;
            if(dto.profile_img) prismaInput.profile_img = dto.profile_img;
        }
        return prismaInput;
    }
}