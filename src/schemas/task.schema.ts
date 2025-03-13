import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Task {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
