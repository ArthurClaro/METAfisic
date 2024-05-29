import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { GroupsMusclesService } from './groups-muscles.service';
import { CreateGroupsMuscleDto } from './dto/create-groups-muscle.dto';
import { UpdateGroupsMuscleDto } from './dto/update-groups-muscle.dto';

@Controller('groups-muscles')
export class GroupsMusclesController {
  constructor(private readonly groupsMusclesService: GroupsMusclesService) { }

  @Post()
  create(@Body() createGroupsMuscleDto: CreateGroupsMuscleDto) {
    return this.groupsMusclesService.create(createGroupsMuscleDto);
  }

  @Get()
  // @UseGuards(JwtAuthGuard)
  findAll() {
    return this.groupsMusclesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsMusclesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupsMuscleDto: UpdateGroupsMuscleDto) {
    return this.groupsMusclesService.update(+id, updateGroupsMuscleDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsMusclesService.remove(id);
  }
}
