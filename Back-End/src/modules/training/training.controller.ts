import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Response, HttpCode } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) { }

  @Post(':id')
  @UseGuards(JwtAuthGuard)
  create(@Body() createTrainingDto: CreateTrainingDto, @Param('id') id: string) {
    // console.log(">>>>>>>>", req.user , "<<<<<<<<<<")
    // console.log(">>>>>>>>", res.params, "<<<<<<<<<<")
    // console.log(">>>>>>>>", id, "<<<<<<<<<<")

    // return this.trainingService.create(createTrainingDto, req.user.id);
    return this.trainingService.create(createTrainingDto, id);
  }

  @Get()
  findAll() {
    return this.trainingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto) {
    return this.trainingService.update(id, updateTrainingDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingService.remove(id);
  }
}
