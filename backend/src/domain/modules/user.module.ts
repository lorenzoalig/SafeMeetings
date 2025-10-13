import { Module } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { DataBaseModule } from "src/infrastructure/modules/database.module";
import { UserMapper } from "src/infrastructure/mappers/user.mappers";


@Module({
    imports: [DataBaseModule],
    controllers: [UserController],
    providers: [UserService, UserRepository, UserMapper]
})
export class UserModule {}