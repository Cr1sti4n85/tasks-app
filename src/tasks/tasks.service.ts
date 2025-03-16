import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../schemas/task.schema';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async findAll() {
    return this.taskModel.find();
  }

  async create(createTask: CreateTaskDto) {
    try {
      const newTask = new this.taskModel(createTask);
      await newTask.save();
      return newTask;
    } catch (error) {
      console.log(error);
      this.handleExceptions(error);
    }
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(id: string, updateTask: UpdateTaskDto) {
    await this.findOne(id);
    const updatedTask = this.taskModel.findByIdAndUpdate(id, updateTask, {
      new: true,
    });
    if (!updatedTask) {
      throw new NotFoundException('Task not found');
    }
    return updatedTask;
  }

  async remove(id: string) {
    const deleted = await this.taskModel.findByIdAndDelete(id);
    if (!deleted) {
      throw new NotFoundException('Task not found');
    }

    return deleted;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Task already exists. ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Can't perform operation. Try again later.`,
    );
  }
}
