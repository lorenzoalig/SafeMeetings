import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

// Room creation DTO
export class CreateRoomDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    accessLevel: number
}