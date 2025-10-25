import { forwardRef, Module } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserController } from "src/application/controllers/user.controller";
import { AuthModule } from "src/application/modules/auth.module";
import { RankModule } from "src/application/modules/rank.module";
import { InfrastructureModule } from "src/infrastructure/modules/infrastructure.module";


@Module({
    imports: [
        InfrastructureModule,
        AuthModule,
        forwardRef(() => RankModule)
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}