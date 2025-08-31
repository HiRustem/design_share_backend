import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';

@Injectable()
export class DesignService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('initial') private initialQueue: Queue,
  ) {}

  async uploadDesign(userId: number, file: Buffer) {
    await this.initialQueue.add({ file, userId });
    return { message: 'File queued for processing' };
  }

  async createInitialRecord(uniqueLink: string, userId: number): Promise<number> {
    const design = await this.prisma.design.create({
      data: {
        uniqueLink,
        userId,
        expiresAt: new Date(Date.now() + 3600000),
        fileData: Buffer.from([]),
      },
    });
    return design.id;
  }

  async saveCompressed(designId: number, compressedFile: Buffer) {
    await this.prisma.design.update({
      where: { id: designId },
      data: { fileData: compressedFile, compressed: true },
    });
  }

  async getDesign(link: string) {
    const design = await this.prisma.design.findUnique({ where: { uniqueLink: link } });
    if (!design || design.expiresAt < new Date()) {
      throw new NotFoundException('Design not found or expired');
    }
    return { file: design.fileData, contentType: 'application/pdf' };
  }

  async getUserDesigns(userId: number) {
    return this.prisma.design.findMany({ where: { userId } });
  }

  async deleteExpired() {
    await this.prisma.design.deleteMany({ where: { expiresAt: { lt: new Date() } } });
  }
}
