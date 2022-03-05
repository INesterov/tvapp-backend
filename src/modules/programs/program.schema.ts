import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProgramDocument = Program & Document;

@Schema()
export class Program {
  @Prop()
  category: string;

  @Prop()
  country: string;

  @Prop()
  description: string;

  @Prop()
  photo: string;

  @Prop()
  title: string;

  @Prop()
  type: string;

  @Prop()
  year: string;

  @Prop()
  day: string;

  @Prop()
  from: string;

  @Prop()
  to: string;

  @Prop()
  channel_id: string;
}

export const ProgramSchema = SchemaFactory.createForClass(Program);
