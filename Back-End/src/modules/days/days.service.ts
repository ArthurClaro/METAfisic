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
    // const foundDay = await this.prisma.day.findMany({ where: { createdAt: "28/05/2024" } })
    const foundCategory = await this.prisma.day.findMany({ where: { category: day.category } })
    const foundCategoryExists = await this.prisma.groupsMuscle.findUnique({ where: { nome: day.category } })
    // console.log(foundDay, "-----------", foundCategory)

    const foundCategory2 = foundDay.filter((element) => element.category == day.category)
    // console.log(foundCategory2)


    if (!foundCategoryExists) {
      throw new NotFoundException("Category not exists")
    }

    if (foundCategory2.length) {
      throw new ConflictException("Day already exists in Category ")
    }

    const fff = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!fff) {
      throw new NotFoundException("User or token not exist")
    }

    const newMusic = await this.prisma.day.create({
      data: {
        id: day.id,
        category: day.category,
        createdAt: timestamp,
        // createdAt: "28/05/2024",
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

    // const daysAll = await this.prisma.day.findMany();

    const sortedDaysAll = [...day].sort((a, b) => {
      const dateA = Number(new Date(a.createdAt));
      const dateB = Number(new Date(b.createdAt));
      return dateA - dateB;
    });

    let previousVtt = 0;

    const newDaysVtt = sortedDaysAll.map((element) => {
      const somaTotalBudget = element.training.reduce((prev, current) => {
        return prev + current.volume;
      }, 0);

      if (previousVtt > 0 && previousVtt > somaTotalBudget) {
        return {
          ...element,
          Vtt: somaTotalBudget,
          BateuMeta: false,
          Faltante: previousVtt - somaTotalBudget,
        };
      }
      previousVtt = somaTotalBudget;

      return {
        ...element,
        Vtt: somaTotalBudget,
        BateuMeta: true,
      };
    });
    // console.log(newDaysVtt)

    // return newDaysVtt
    // return plainToInstance(Day, day)
    return plainToInstance(Day, newDaysVtt)
    // return plainToInstance(Day, { day, newDaysVtt: newDaysVtt })
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

  async remove(id: string) {
    const user = await this.prisma.day.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException("User does not exists")
    }
    await this.prisma.day.delete({ where: { id } })
  }

  // remove(id: number) {
  //   return `This action removes a #${id} day`;
  // }
}
