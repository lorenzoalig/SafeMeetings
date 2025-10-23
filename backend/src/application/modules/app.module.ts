import { Module } from '@nestjs/common';
import { RoomModule } from 'src/domain/modules/room.module';
import { UserModule } from 'src/domain/modules/user.module';
import { AuthModule } from './auth.module';
import { ReportModule } from './report.module';
import { BadgeModule } from './badge.module';

@Module({
  imports: [UserModule, RoomModule, AuthModule, ReportModule, BadgeModule]
})
export class AppModule {}
