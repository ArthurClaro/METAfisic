import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { MusicsService } from './musics.service';
import { CreateMusicDto } from './dto/create-music.dto';
import { UpdateMusicDto } from './dto/update-music.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('musics')
export class MusicsController {
  constructor(private readonly musicsService: MusicsService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createMusicDto: CreateMusicDto, @Request() req) {
    return this.musicsService.create(createMusicDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.musicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMusicDto: UpdateMusicDto) {
    return this.musicsService.update(id, updateMusicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.musicsService.remove(id);
  }
}
