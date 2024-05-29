import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    const foundUser = await this.prisma.user.findFirst({
      where: { email: createUserDto.email }
    })

    if (foundUser) {
      throw new ConflictException("Email already exists")
    }

    const user = new User()
    Object.assign(user, createUserDto)
    const newUser = await this.prisma.user.create({ data: { ...user } })
    return plainToInstance(User, newUser)
  }

  async findAll() {
    const users = await this.prisma.user.findMany()
    return plainToInstance(User, users)
  }

  async findOne(id: string): Promise<User> {
    // const user = await this.prisma.user.findUnique({ where: { id } })
    const user = await this.prisma.user.findUnique({ where: { email: id } })
    if (!user) {
      throw new NotFoundException("User does not exists")
    }
    return plainToInstance(User, user)


  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } })
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException("User does not exists")
    }
    const updatedUser = await this.prisma.user.update({ where: { id }, data: { ...updateUserDto } })
    return plainToInstance(User, updatedUser)
  }

  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } })
    if (!user) {
      throw new NotFoundException("User does not exists")
    }
    await this.prisma.user.delete({ where: { id } })
  }
}
