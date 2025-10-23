import { Controller, Param, Post, Res, UseGuards } from "@nestjs/common";
import { BadgeService } from "../services/badge.service";
import { AuthGuard } from "../guards/auth.guard";


@Controller("badge")
export class BadgeController {
    constructor(private readonly badgeService: BadgeService) {}

    @Post(":id")
    @UseGuards(AuthGuard)
    async getBadge(
        @Param("id") id: number,
        @Res() res
    ) {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-disposition", "inline; filename=badge.pdf");
        const doc = await this.badgeService.createBadge(+id);
        doc.pipe(res);
        doc.end();
    }
}