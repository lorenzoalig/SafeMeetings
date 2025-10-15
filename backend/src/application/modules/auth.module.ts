import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "../services/auth.service";
import { AuthGuard } from "../guards/auth.guard";
import { UserModule } from "src/domain/modules/user.module";


@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            global: true,
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: "1h"}
        })
    ],
    providers: [AuthService, AuthGuard]
})
export class AuthModule {}