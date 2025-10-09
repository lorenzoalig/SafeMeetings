import { IsBase64, IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword, Max, MaxLength, Min, MinLength } from "class-validator";

// User update DTO
export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @MinLength(3)
    @MaxLength(16)
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;          // Create separate route for email change through email

    @IsOptional()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    password: string;       // Create separate route for password change through email

    @IsOptional()
    @IsNumber()
    @Min(1)
    @Max(5)
    level: number;

    @IsOptional()
    @IsBase64()
    profile_img: string
}