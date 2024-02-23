import { Test, TestingModule } from '@nestjs/testing';
import { GroupsMusclesService } from './groups-muscles.service';

describe('GroupsMusclesService', () => {
  let service: GroupsMusclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupsMusclesService],
    }).compile();

    service = module.get<GroupsMusclesService>(GroupsMusclesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
