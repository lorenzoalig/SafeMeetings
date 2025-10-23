import { Module } from '@nestjs/common';
import { RoomModule } from 'src/domain/modules/room.module';
import { UserModule } from 'src/domain/modules/user.module';
import { AuthModule } from './auth.module';
import { PdfReportModule } from './pdf-report.module';

@Module({
  imports: [UserModule, RoomModule, AuthModule, PdfReportModule]
})
export class AppModule {}
