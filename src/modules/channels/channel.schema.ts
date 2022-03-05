import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ID, ObjectType } from '@nestjs/graphql';

export type ChannelDocument = Channel & Document;

@Schema()
@ObjectType({ description: 'channel' })
export class Channel {
  @Prop()
  @Field(() => ID)
  id: string;

  @Prop()
  @Field(() => String)
  title: string;
}

export const ChannelSchema = SchemaFactory.createForClass(Channel);
