import { Module } from "@nestjs/common";
import { AuthModule } from "./auth.module";
import { ReportController } from "../controllers/report.controller";
import { ReportService } from "../services/report.service";
import { ReportGeneratorModule } from "src/infrastructure/modules/report-generator.module";
import { UserModule } from "src/domain/modules/user.module";


@Module({
    imports: [AuthModule, ReportGeneratorModule, UserModule],
    controllers: [ReportController],
    providers: [ReportService]
})
export class ReportModule {}