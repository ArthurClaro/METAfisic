import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Training } from './entities/training.entity';
import { plainToInstance } from 'class-transformer';
import { Day } from '../days/entities/day.entity';

@Injectable()
export class TrainingService {
  constructor(private prisma: PrismaService) { }

  async create(createTrainingDto: CreateTrainingDto, dayId: string) {
    const day1 = new Day()
    const dayFound = await this.prisma.day.findUnique({ where: { id: dayId } })
    if (!dayFound) {
      throw new NotFoundException("Day does not exists")
    }
    const training = Object.assign(new Training(), createTrainingDto)
    const vtt = Number((training.kg * training.repetitions) * training.serie)
    const newArr = await this.prisma.training.create({
      data: {

        id: training.id,
        name: training.name,
        serie: training.serie,
        kg: training.kg,
        repetitions: training.repetitions,
        volume: vtt,

        dayId: dayFound.id
      }
    })

    return newArr
  }

  async findAll() {
    const train = await this.prisma.training.findMany({ include: { Day: true } })
    return plainToInstance(Training, train)
  }

  async findOne(id: string) {
    const day = await this.prisma.training.findMany({ where: { dayId: id } })

    if (!day) {
      throw new NotFoundException("Training does not exists")
    }
    return plainToInstance(Training, day)
  }

  async update(id: string, updateTrainingDto: UpdateTrainingDto): Promise<Training> {
    const user = await this.prisma.training.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException("Day does not exists")
    }
    const training = Object.assign(new Training(), updateTrainingDto)

    const vtt = Number((training.kg * training.repetitions) * training.serie)

    const updatedUser = await this.prisma.training.update({ where: { id }, data: { ...updateTrainingDto, volume: vtt } })
    return plainToInstance(Training, updatedUser)
  }

  async remove(id: string) {
    const user = await this.prisma.training.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException("Training does not exists")
    }
    await this.prisma.training.delete({ where: { id } })
  }
}