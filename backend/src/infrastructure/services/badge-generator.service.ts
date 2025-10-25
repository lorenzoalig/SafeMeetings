import { Injectable, InternalServerErrorException, Req } from "@nestjs/common";
import path from "path";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { UserResponseDto } from "src/domain/dtos/user/user-response.dto";


@Injectable()
export class BadgeGeneratorService {
    constructor() {}
    
    async generateBadge(user: UserResponseDto) : Promise<PDFDocument> {
        const doc = new PDFDocument({
            size: "A4",
            margin: 50,
        });

        // Disclaimer: PDF template generated with AI - not IP of the author

        // ==== HEADER ====
        const logoPath = path.join(__dirname, "..", "..", "..", "assets", "techlo-logo.png");
        doc.image(logoPath, 50, 5, { width: 125 });
        doc.fontSize(14).text("USER BADGE", 50, 70, {
            align: "center",
            width: doc.page.width - 100,
        });
        doc.moveTo(50, 100).lineTo(550, 100).stroke();

        // ==== CONTENT ====
        doc.moveDown(5);
        doc.fontSize(12).text("User ID: " + user.id, 90, 180);
        doc.text("Name: " + user.name);
        doc.text("Email: " + user.email);
        doc.text("Access Level: " + user.level);
        doc.text("Issued on: " + new Date().toDateString());
        
        if(user.profile_img) {
            const profileImgBase64 = user.profile_img;
            const profileImgBuffer = Buffer.from(profileImgBase64, "base64");
            doc.image(profileImgBuffer, 375, 150, { width: 330, height: 330, fit: [150, 150] });
        }
        
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
        const userId = user.id;
        const qrDataUrl = await QRCode.toDataURL(userId.toString());
        const imgBase64 = qrDataUrl.replace(/^data:image\/png;base64,/, "");
        const imgBuffer = Buffer.from(imgBase64, "base64");
        doc.image(imgBuffer, 185, footerY - 350, { width: 230 });

        return doc;
    }
}