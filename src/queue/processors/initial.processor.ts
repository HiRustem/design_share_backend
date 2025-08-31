import { Process, Processor } from '@nestjs/bull';
import type { Job, Queue } from 'bull';
import { DesignService } from '../../design/design.service';
import { InjectQueue } from '@nestjs/bull';

@Processor('initial')
export class InitialProcessor {
  constructor(
    private designService: DesignService,
    @InjectQueue('processing') private processingQueue: Queue,
  ) {}

  @Process()
  async handle(job: Job<{ file: Buffer; userId: number }>) {
    const { file, userId } = job.data;
    const uniqueLink = `design-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const designId = await this.designService.createInitialRecord(uniqueLink, userId);
    await this.processingQueue.add({ designId, file });
    return { uniqueLink };
  }
}
