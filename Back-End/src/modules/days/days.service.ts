import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Day } from './entities/day.entity';
import { plainToInstance } from 'class-transformer';
import { User } from '../users/entities/user.entity';
import { GroupsMuscle } from '../groups-muscles/entities/groups-muscle.entity';

@Injectable()
export class DaysService {

  constructor(private prisma: PrismaService) { }
  async create(createDayDto: CreateDayDto, userId: string) {

    const timestamp = new Date().toLocaleDateString()
    const day = Object.assign(new Day(), createDayDto)
    const user = Object.assign(new User(), createDayDto)

    const foundDay = await this.prisma.day.findMany({ where: { createdAt: timestamp } })
    const foundCategory = await this.prisma.day.findMany({ where: { category: day.category } })
    const foundCategoryExists = await this.prisma.day.findMany({ where: { category: day.category } })

    if (foundCategoryExists.length == 0) {
      throw new NotFoundException("Category not exists")
    }

    if (foundDay.length >= 1 && foundCategory.length >= 1) {
      throw new ConflictException("Day already exists or Category already exists")
    }

    // console.log("aaaaaaaaaaaaaaa", userId, "aaaaaaaaaa")
    const fff = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!fff) {
      throw new NotFoundException("User does not exists")
    }

    const newMusic = await this.prisma.day.create({
      data: {
        id: day.id,
        category: day.category,
        createdAt: timestamp + 2,
        userId
      }
    })


    return newMusic
  }

  async findAll() {
    const users = await this.prisma.day.findMany({ include: { training: true, GroupsMuscle: true } })
    return plainToInstance(Day, users)
  }

  async findOne(id: string) {
    const day = await this.prisma.day.findMany({ where: { category: id }, include: { training: true, GroupsMuscle: true } })
    if (!day) {
      throw new NotFoundException("Day does not exists")
    }
    return plainToInstance(Day, day)
  }

  async update(id: string, updateDayDto: UpdateDayDto): Promise<Day> {
    const user = await this.prisma.day.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException("Day does not exists")
    }
    const updatedUser = await this.prisma.day.update({ where: { id }, data: { ...updateDayDto } })
    return plainToInstance(Day, updatedUser)
  }

  // update(id: number, updateDayDto: UpdateDayDto) {
  //   return `This action updates a #${id} day`;
  // }

  remove(id: number) {
    return `This action removes a #${id} day`;
  }
}
