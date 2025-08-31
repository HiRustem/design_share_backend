import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { InitialProcessor } from './processors/initial.processor';
import { ProcessingProcessor } from './processors/processing.processor';
import { DesignModule } from '../design/design.module';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'initial' }),
    BullModule.registerQueue({ name: 'processing' }),
    DesignModule,
  ],
  providers: [InitialProcessor, ProcessingProcessor],
})
export class QueueModule {}
