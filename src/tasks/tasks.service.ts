import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from '../schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async findAll() {
    await this.taskModel.find();
  }

  async create(createTask: any) {
    const newTask = new this.taskModel(createTask);
    await newTask.save();
    return newTask;
  }

  async findOne(id: string) {
    await this.taskModel.findById(id);
  }

  async update(id: string, updateTask: any) {
    await this.taskModel.findByIdAndUpdate(id, updateTask, { new: true });
  }

  async remove(id: string) {
    await this.taskModel.findByIdAndDelete(id);
  }
}
