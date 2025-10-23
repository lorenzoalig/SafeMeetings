import { Module } from "@nestjs/common";
import { ReportGeneratorService } from "../services/report-generator.service";
import { BadgeGeneratorService } from "../services/badge-generator.service";



@Module({
    providers: [BadgeGeneratorService],
    exports: [BadgeGeneratorService]
})
export class BadgeGeneratorModule {}
