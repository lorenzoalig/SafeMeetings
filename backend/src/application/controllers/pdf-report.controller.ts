import { Controller, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";




@Controller("report")
export class PdfReportController {
    @Get()
    @UseGuards(AuthGuard)
    createReport() {
        // Add pdf-report service
    }
}