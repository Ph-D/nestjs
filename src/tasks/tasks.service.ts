import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaksRepository)
    private tasksRepository: TaksRepository
  ) {}
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;

   
  //   let tasks = this.getAllTasks();


  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       }
  //       return false;
  //     });
  //   }

  //   return tasks;
  // }

  // getTaskById(id: string): Task {

  //   const found = this.tasks.find((task) => task.id === id);

  //   if (!found) {
  //     throw new NotFoundException(`Task with ID ${id} not found`);
  //   }
  //   return found;
  // }

  // createTask(createTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // deleteTask(id: string): void {
	// 	const found = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }

  // updateTaskStatus(id: string, status: TaskStatus) {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with ${id} not found.`)
    }
    return found;
  }

  createTask(createTaskDto:CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    
    if(result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

  }


}
