import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { UserRepository } from "src/infrastructure/repositories/user.repository";
import { DataBaseModule } from "src/infrastructure/modules/database.module";
import { UserMapper } from "src/infrastructure/mappers/user.mappers";
import { AuthModule } from "src/application/modules/auth.module";
import { RankModule } from "src/application/modules/rank.module";
import { InfrastructureModule } from "src/infrastructure/modules/infrastructure.module";


@Module({
    imports: [
        DataBaseModule,
        InfrastructureModule,
        forwardRef(() => RankModule),
        forwardRef(() => AuthModule),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}