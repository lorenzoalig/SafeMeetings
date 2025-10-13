import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

// Room update DTO
export class UpdateRoomDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    accessLevel: number;
}