import { Injectable, Req } from "@nestjs/common";
import { UserService } from "src/domain/services/user.service";
import { PdfGeneratorService } from "src/infrastructure/services/pdf-generator.service";
import PDFDocument from "pdfkit";



@Injectable()
export class PdfReportService {
    constructor(
        private readonly userService: UserService,
        private readonly pdfGeneratorService: PdfGeneratorService
    ) {}

    async createReport(request): Promise<PDFDocument> {
        const user = request.user;
        const userData = await this.userService.showUserById(user.userId);
        return await this.pdfGeneratorService.generatePdf(userData);
    }
}