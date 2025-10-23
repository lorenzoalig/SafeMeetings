import { Module } from "@nestjs/common";
import { AuthModule } from "./auth.module";
import { PdfReportController } from "../controllers/pdf-report.controller";
import { PdfReportService } from "../services/pdf-report.service";


@Module({
    imports: [AuthModule],
    controllers: [PdfReportController],
    providers: [PdfReportService]
})
export class PdfReportModule {}