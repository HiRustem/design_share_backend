import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Req,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DesignService } from './design.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express';
import 'multer';

@Controller('design')
export class DesignController {
  constructor(private designService: DesignService) {}

  @Post('upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(@Req() req, @UploadedFile() file: Express.Multer.File) {
    return this.designService.uploadDesign(req.user.id, file.buffer);
  }

  @Get(':link')
  async view(@Param('link') link: string) {
    return this.designService.getDesign(link);
  }

  @Get('list')
  @UseGuards(JwtAuthGuard)
  async list(@Req() req) {
    return this.designService.getUserDesigns(req.user.id);
  }
}
