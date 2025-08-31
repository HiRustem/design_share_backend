import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number) {
    return this.prisma.user.findUnique({ where: { id: userId }, include: { designs: true } });
  }

  async updateProfile(userId: number, dto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id: userId }, data: dto });
  }

  async deleteAccount(userId: number) {
    await this.prisma.user.delete({ where: { id: userId } });
    return { message: 'Account deleted' };
  }
}
