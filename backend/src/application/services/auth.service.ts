import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UserLoginDto } from "src/domain/dtos/user/user-login.dto";
import { UserRepository } from "src/infrastructure/repositories/user.repository";

type signInData = {
    id: number,
    email: string
}

export type authOutput = {
    token: string,
    userId: number,
    email: string,
}

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userRepository: UserRepository
    ) {}

    // Authenticates user and returns JWT token if valid
    async authenticate(loginDto: UserLoginDto): Promise<authOutput> {
        const signInData = await this.validateUser(loginDto);

        if(!signInData) throw new UnauthorizedException("Error: invalid email or password.");
        return this.signIn(signInData);
    }

    // Validates user credentials
    async validateUser(loginDto: UserLoginDto): Promise<signInData | null> {
        const user = await this.userRepository.findUserByEmail(loginDto.email);

        if(user && await bcrypt.compare(loginDto.password, user.password)) {
            return {
                id: user.id,
                email: user.email
            }
        }
        return null;
    }

    // Generates JWT token for authenticated user
    async signIn(loginData: signInData): Promise<authOutput> {
        const payload = {
            sub: loginData.id,
            email: loginData.email
        }
        const token = await this.jwtService.signAsync(payload);
        return {token: token, userId: loginData.id, email: loginData.email};
    }
}