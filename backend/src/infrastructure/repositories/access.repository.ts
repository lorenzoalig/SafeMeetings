import { Injectable } from "@nestjs/common";
import { DataBaseService } from "../services/database.service";
import { Access, Prisma } from "generated/prisma-client";


@Injectable()
export class AccessRepository {
    constructor(private readonly dataBaseService: DataBaseService) {}

    async registerAccess(userId: number, roomId: string): Promise<Access | null> {  
        const accessLog = await this.dataBaseService.access.create({
            data: {userId, roomId}
        });
        return accessLog;
    }
}