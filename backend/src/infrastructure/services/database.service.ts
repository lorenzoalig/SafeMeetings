import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "generated/prisma-client";



@Injectable()
export class DataBaseService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect();
    }
}