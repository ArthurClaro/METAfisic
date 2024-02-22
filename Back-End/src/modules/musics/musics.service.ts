import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Music } from './entities/music.entity';

@Injectable()
export class MusicsService {
  constructor(private prisma: PrismaService) { }
  async create(createMusicDto: CreateMusicDto, userId: string) {
    const music = Object.assign(new Music(), createMusicDto)
    const newMusic = await this.prisma.music.create({
      data: {
        id: music.id,
        album: music.album,
        artist: music.artist,
        name: music.name,
        year: music.year,
        genre: music.genre,
        cover_image: music.cover_image,
        music_url: music.music_url,
        userId
      }
    })
    return newMusic
  }

  async findAll() {
    return await this.prisma.music.findMany()
  }

  async findOne(id: string) {
    const music = await this.prisma.music.findFirst({ where: { id } })
    if (!music) {
      throw new NotFoundException("Music not found")
    }
    return music
  }

  update(id: string, updateMusicDto: UpdateMusicDto) {
    return `This action updates a #${id} music`;
  }

  remove(id: string) {
    return `This action removes a #${id} music`;
  }
}
