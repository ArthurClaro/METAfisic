import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { GroupsMusclesModule } from './modules/groups-muscles/groups-muscles.module';
import { TrainingModule } from './modules/training/training.module';
import { DaysModule } from './modules/days/days.module';

@Module({
  imports: [UsersModule, AuthModule, GroupsMusclesModule, TrainingModule, DaysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
