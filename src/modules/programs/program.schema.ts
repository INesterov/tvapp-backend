import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType, InputType } from '@nestjs/graphql';

export type ProgramDocument = Program & Document;

@Schema()
@ObjectType({ description: 'program' })
export class Program {
  @Prop()
  @Field(() => String, { nullable: true })
  category: string;

  @Prop()
  @Field(() => String, { nullable: true })
  country: string;

  @Prop()
  @Field(() => String)
  description: string;

  @Prop()
  @Field(() => String, { nullable: true })
  photo: string;

  @Prop()
  @Field(() => String)
  title: string;

  @Prop()
  @Field(() => String, { nullable: true })
  type: string;

  @Prop()
  @Field(() => String, { nullable: true })
  year: string;

  @Prop()
  @Field(() => String)
  day: string;

  @Prop()
  @Field(() => String)
  from: string;

  @Prop()
  @Field(() => String)
  to: string;

  @Prop()
  @Field(() => String)
  channel_id: string;
}

export const ProgramSchema = SchemaFactory.createForClass(Program);
