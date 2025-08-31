import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DesignModule } from './design/design.module';
import { QueueModule } from './queue/queue.module';
import { PrismaService } from './prisma/prisma.service';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRoot({ redis: process.env.REDIS_URL }),
    AuthModule,
    UserModule,
    DesignModule,
    QueueModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
