import { forwardRef, Module } from "@nestjs/common";
import { RankGuard } from "../guards/rank.guard";
import { UserModule } from "src/domain/modules/user.module";


@Module({
    imports: [forwardRef(() => UserModule)],
    providers: [RankGuard]
})
export class RankModule {}