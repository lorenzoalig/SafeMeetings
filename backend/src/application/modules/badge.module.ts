import { Module } from "@nestjs/common";
import { BadgeService } from "../services/badge.service";
import { BadgeGeneratorModule } from "src/infrastructure/modules/badge-generator.module";
import { BadgeController } from "../controllers/badge.controller";
import { AuthModule } from "./auth.module";
import { UserModule } from "src/domain/modules/user.module";


@Module({
    imports: [BadgeGeneratorModule, AuthModule, UserModule],
    controllers: [BadgeController],
    providers: [BadgeService]
})
export class BadgeModule {}