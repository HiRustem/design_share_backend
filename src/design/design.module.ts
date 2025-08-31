import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { PrismaService } from '../prisma/prisma.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [BullModule.registerQueue({ name: 'initial' })],
  controllers: [DesignController],
  providers: [DesignService, PrismaService],
  exports: [DesignService],
})
export class DesignModule {}
