import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { DataBaseModule } from "src/infrastructure/modules/database.module";


@Module({
    imports: [
        DataBaseModule,
        JwtModule.register({
        global: true,
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: "1h"}
    })],
    providers: []
})
export class AuthModule {}