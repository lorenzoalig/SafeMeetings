import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class UserLoginDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Type(() => String)
    password: string;
}