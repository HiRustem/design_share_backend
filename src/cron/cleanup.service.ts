import { Injectable, OnModuleInit } from '@nestjs/common';
import * as cron from 'node-cron';
import { DesignService } from '../design/design.service';

@Injectable()
export class CleanupService implements OnModuleInit {
  constructor(private designService: DesignService) {}

  onModuleInit() {
    cron.schedule('0 * * * *', async () => {
      await this.designService.deleteExpired();
    });
  }
}
