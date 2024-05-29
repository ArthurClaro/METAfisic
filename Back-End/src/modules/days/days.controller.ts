import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, HttpCode } from '@nestjs/common';
import { DaysService } from './days.service';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('days')
export class DaysController {
  constructor(private readonly daysService: DaysService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createDayDto: CreateDayDto, @Request() req) {
    // console.log(createDayDto)
    return this.daysService.create(createDayDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.daysService.findAll();
  }
  

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.daysService.findOne(id);
  }

  
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateDayDto: UpdateDayDto) {
    return this.daysService.update(id, updateDayDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.daysService.remove(id);
  }
}
