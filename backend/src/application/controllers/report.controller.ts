import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../guards/auth.guard";
import { ReportService } from "../services/report.service";


@Controller("pdf-report")
export class ReportController {
    constructor(private readonly pdfReportService: ReportService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getReport(@Res() res) {
        // res.setHeader("Content-Type","application/pdf");     // Opens in browser for insomnia
        // res.setHeader("Content-disposition","inline; filename=user-report.pdf");

        const doc = await this.pdfReportService.createReport();
        doc.pipe(res);
        doc.end();
    }
}