import { Module } from "@nestjs/common";
import { DataBaseService } from "../services/database.service";


@Module({
    providers: [DataBaseService],
    exports: [DataBaseService]
})
export class DataBaseModule {}