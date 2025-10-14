import { Module } from "@nestjs/common";
import { RankGuard } from "../guards/rank.guard";


@Module({
    providers: [RankGuard]
})
export class RankModule {}