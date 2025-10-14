import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DataBaseModule } from "src/infrastructure/modules/database.module";
import { AuthService } from "../services/auth.service";
import { AuthGuard } from "../guards/auth.guard";


@Module({
    imports: [
        DataBaseModule,
        JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "1h"}
    })],
    providers: [AuthService, AuthGuard]
})
export class AuthModule {}