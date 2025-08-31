import { Process, Processor } from '@nestjs/bull';
import type { Job } from 'bull';
import { DesignService } from '../../design/design.service';
import { exec } from 'child_process';
import * as fs from 'fs-extra';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Processor('processing')
export class ProcessingProcessor {
  constructor(private designService: DesignService) {}

  @Process()
  async handle(job: Job<{ designId: number; file: Buffer }>) {
    const { designId, file } = job.data;
    const inputPath = `/tmp/input-${designId}.pdf`;
    const outputPath = `/tmp/compressed-${designId}.pdf`;

    await fs.writeFile(inputPath, file);
    await execAsync(
      `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputPath} ${inputPath}`,
    );
    const compressed = await fs.readFile(outputPath);

    await this.designService.saveCompressed(designId, compressed);

    await fs.unlink(inputPath);
    await fs.unlink(outputPath);
  }
}
