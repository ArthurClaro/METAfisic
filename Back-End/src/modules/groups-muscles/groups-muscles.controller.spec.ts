import { Test, TestingModule } from '@nestjs/testing';
import { GroupsMusclesController } from './groups-muscles.controller';
import { GroupsMusclesService } from './groups-muscles.service';

describe('GroupsMusclesController', () => {
  let controller: GroupsMusclesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupsMusclesController],
      providers: [GroupsMusclesService],
    }).compile();

    controller = module.get<GroupsMusclesController>(GroupsMusclesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
