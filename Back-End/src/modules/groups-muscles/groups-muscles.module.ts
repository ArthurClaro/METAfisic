import { Module } from '@nestjs/common';
import { GroupsMusclesService } from './groups-muscles.service';
import { GroupsMusclesController } from './groups-muscles.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [GroupsMusclesController],
  providers: [GroupsMusclesService, PrismaService],
})
export class GroupsMusclesModule { }
