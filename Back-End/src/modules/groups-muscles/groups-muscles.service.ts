import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupsMuscleDto } from './dto/create-groups-muscle.dto';
import { UpdateGroupsMuscleDto } from './dto/update-groups-muscle.dto';
import { PrismaService } from 'prisma/prisma.service';
import { GroupsMuscle } from './entities/groups-muscle.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GroupsMusclesService {
  constructor(private prisma: PrismaService) { }

  async create(createGroupsMuscleDto: CreateGroupsMuscleDto) {
    const foundUser = await this.prisma.groupsMuscle.findFirst({
      where: { nome: createGroupsMuscleDto.nome }
    })

    if (foundUser) {
      throw new ConflictException("Nome already exists")
    }
    const user = new GroupsMuscle()
    Object.assign(user, createGroupsMuscleDto)
    // if (user) {
    //   throw new ConflictException("Not Admin")
    // }
    // LOCK HTTP CREATE GROUPS 
    const newUser = await this.prisma.groupsMuscle.create({ data: { ...user } })
    return plainToInstance(GroupsMuscle, newUser)
  }

  async findAll() {
    const users = await this.prisma.groupsMuscle.findMany({ include: { day: true } })
    return plainToInstance(GroupsMuscle, users)
  }

  async findOne(id: string): Promise<GroupsMuscle> {
    const user = await this.prisma.groupsMuscle.findUnique({ where: { id }, include: { day: true } })
    if (!user) {
      throw new NotFoundException("User does not exists")
    }
    return plainToInstance(GroupsMuscle, user)
  }

  update(id: number, updateGroupsMuscleDto: UpdateGroupsMuscleDto) {
    return `This action updates a #${id} groupsMuscle`;
  }

  async remove(id: string) {
    const user = await this.prisma.groupsMuscle.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException("User does not exists")
    }
    await this.prisma.groupsMuscle.delete({ where: { id } })
  }
}