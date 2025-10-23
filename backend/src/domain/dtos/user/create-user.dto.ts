import { IsBase64, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Max, MaxLength, Min, MinLength } from "class-validator";

// User creation DTO
export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(16)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    level: number;

    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string;

    @IsOptional()
    @IsBase64()
    profile_img: string
}