import { Module } from "@nestjs/common";
import { AuthModule } from "./auth.module";
import { PdfReportController } from "../controllers/pdf-report.controller";
import { PdfReportService } from "../services/pdf-report.service";
import { PdfGeneratorModule } from "src/infrastructure/modules/pdf-generator.module";


@Module({
    imports: [AuthModule, PdfGeneratorModule],
    controllers: [PdfReportController],
    providers: [PdfReportService]
})
export class PdfReportModule {}