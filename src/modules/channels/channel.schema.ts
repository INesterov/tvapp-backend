import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChannelDocument = Channel & Document;

@Schema()
export class Channel {
  @Prop()
  id: string;

  @Prop()
  title: string;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
