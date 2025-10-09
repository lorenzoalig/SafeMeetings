import { IsBoolean, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from "class-validator";

// Room update DTO
export class UpdateRoomDto {
    @IsOptional()
    @IsString()
    @MaxLength(100)
    description: string;

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    accessLevel: number;

    @IsOptional()
    @IsBoolean()
    is_blocked: boolean
}