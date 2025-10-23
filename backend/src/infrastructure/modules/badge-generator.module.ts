import { Module } from "@nestjs/common";
import { PdfGeneratorService } from "../services/pdf-generator.service";
import { BadgeGeneratorService } from "../services/badge-generator.service";



@Module({
    providers: [BadgeGeneratorService],
    exports: [BadgeGeneratorService]
})
export class BadgeGeneratorModule {}
