import { Body, Controller, Post, ValidationPipe } from "@nestjs/common";
import { UserLoginDto } from "src/domain/dtos/user/user-login.dto";
import { authOutput, AuthService } from "../services/auth.service";


@Controller("login")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    login(@Body(new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true
        }))
        loginDto: UserLoginDto): Promise<authOutput> 
    {
        return this.authService.authenticate(loginDto);
    }
}