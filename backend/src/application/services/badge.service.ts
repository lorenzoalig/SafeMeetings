import { Injectable, NotFoundException } from "@nestjs/common";
import { UserService } from "src/domain/services/user.service";
import { BadgeGeneratorService } from "src/infrastructure/services/badge-generator.service";
import PDFDocument from "pdfkit";


@Injectable()
export class BadgeService {
    constructor(
        private readonly userService: UserService,
        private readonly badgeGeneratorService: BadgeGeneratorService
    ) {}

    async createBadge(id: number): Promise<PDFDocument> {
        const user = await this.userService.showUserById(id);

        if(!user) throw new NotFoundException("Error: user not found.");
        return await this.badgeGeneratorService.generateBadge(user);
    }
}