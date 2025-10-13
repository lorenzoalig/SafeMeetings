import { Module } from '@nestjs/common';
import { RoomModule } from 'src/domain/modules/room.module';
import { UserModule } from 'src/domain/modules/user.module';

@Module({
  imports: [UserModule, RoomModule]
})
export class AppModule {}
