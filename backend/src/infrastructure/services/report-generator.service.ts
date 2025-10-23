import { Injectable } from "@nestjs/common";
import { UserResponseDto } from "src/domain/dtos/user/user-response.dto";
import path from "path";
import PDFDocument from "pdfkit";
import 'pdfkit-table';
import QRCode from "qrcode";


@Injectable()
export class ReportGeneratorService {
    constructor() {}
    
    async generateReport(users: UserResponseDto[]) : Promise<PDFDocument> {
        const doc = new PDFDocument({
            size: "A4",
            margin: 50,
        });

        // Disclaimer: PDF template generated with AI - not IP of the author

        // ==== HEADER ====
        const logoPath = path.join(__dirname, "..", "..", "..", "assets", "techlo-logo.png");
        doc.image(logoPath, 50, 5, { width: 125 });
        doc.fontSize(14).text("USERS REPORT", 50, 70, {
            align: "center",
            width: doc.page.width - 100,
        });
        doc.moveTo(50, 100).lineTo(550, 100).stroke();

        // ==== CONTENT ====
        doc.moveDown(5);
        doc.fontSize(12).text("Active users list:", 80, 180);
        doc.moveDown(1);
        doc.fontSize(11);
        users.forEach(u => {
            doc.text("ID: " + u.id + " - Name: " + u.name + " - Email: " + u.email + " - Access level: " + u.level);
        });

        // ==== FOOTER ====
        const footerY = doc.page.height - 80;
        doc.moveTo(50, footerY).lineTo(550, footerY).strokeColor("#999").lineWidth(1).stroke();
        doc.fontSize(9)
        .fillColor("#666")
        .text("© 2025 Techlo — Fiction made real", 50, footerY + 10, {
            align: "center",
            width: doc.page.width - 100,
        });

        // QRCode generator
        const portfolioUrl = "https://github.com/lorenzoalig";
        const qrDataUrl = await QRCode.toDataURL(portfolioUrl);
        const imgBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
        const imgBuffer = Buffer.from(imgBase64, "base64");
        doc.image(imgBuffer, 360, footerY - 200, { width: 165 });

        return doc;
    }
}