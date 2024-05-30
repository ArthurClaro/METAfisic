import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupsMuscleDto } from './create-groups-muscle.dto';

export class UpdateGroupsMuscleDto extends PartialType(CreateGroupsMuscleDto) {}