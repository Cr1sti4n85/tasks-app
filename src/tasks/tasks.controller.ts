import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from 'src/dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get()
  findAll() {
    return this.taskService.findAll();
  }

  @Get()
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Post()
  create(@Body() task: CreateTaskDto) {
    return this.taskService.create(task);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() task: CreateTaskDto) {}
}
