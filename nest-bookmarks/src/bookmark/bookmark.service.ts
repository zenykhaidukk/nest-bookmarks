import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarDto, EditBookmarDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  async createBookmark(userId: number, dto: CreateBookmarDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: { userId, ...dto },
    });
    return bookmark;
  }

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({ where: { userId } });
  }

  getBookmarkById(userId: number, id: number) {
    return this.prisma.bookmark.findFirst({ where: { userId, id } });
  }

  async editBookmark(userId: number, id: number, dto: EditBookmarDto) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { userId, id },
    });
    if (!bookmark || bookmark.userId !== userId)
      throw new ForbiddenException('Access to resourcen denied');
    return await this.prisma.bookmark.update({
      where: { userId, id },
      data: { ...dto },
    });
  }

  async deleteBookmark(userId: number, id: number) {
    await this.prisma.bookmark.delete({ where: { userId, id } });
  }
}
