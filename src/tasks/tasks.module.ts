import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TaksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaksRepository])
  ],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
