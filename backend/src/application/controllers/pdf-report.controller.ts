import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { PdfReportService } from "../services/pdf-report.service";




@Controller("report")
export class PdfReportController {
    constructor(private readonly pdfReportService: PdfReportService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getReport(@Req() req, @Res() res) {
        res.setHeader("Content-Type","application/pdf");
        res.setHeader("Content-disposition","inline; filename=user-report.pdf");

        const doc = await this.pdfReportService.createReport(req);
        doc.pipe(res);
        doc.end();
    }
}