import { Injectable } from "@nestjs/common";
import { UserService } from "src/domain/services/user.service";
import { ReportGeneratorService } from "src/infrastructure/services/report-generator.service";
import PDFDocument from "pdfkit";


@Injectable()
export class ReportService {
    constructor(
        private readonly userService: UserService,
        private readonly pdfGeneratorService: ReportGeneratorService
    ) {}

    async createReport(): Promise<PDFDocument> {
        const users = await this.userService.showAllUsers();
        return await this.pdfGeneratorService.generateReport(users);
    }
}