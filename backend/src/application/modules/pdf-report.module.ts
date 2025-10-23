import { Module } from "@nestjs/common";
import { AuthModule } from "./auth.module";
import { PdfReportController } from "../controllers/pdf-report.controller";
import { PdfReportService } from "../services/pdf-report.service";
import { PdfGeneratorModule } from "src/infrastructure/modules/pdf-generator.module";
import { UserService } from "src/domain/services/user.service";
import { UserModule } from "src/domain/modules/user.module";


@Module({
    imports: [AuthModule, PdfGeneratorModule, UserModule],
    controllers: [PdfReportController],
    providers: [PdfReportService]
})
export class PdfReportModule {}