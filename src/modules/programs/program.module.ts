import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Program, ProgramSchema } from './program.schema';
import { ProgramService } from './program.service';
import { ProgramsResolver } from './program.resolvers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Program.name, schema: ProgramSchema }]),
  ],
  providers: [ProgramsResolver, ProgramService],
  exports: [ProgramService],
})
export class ProgramModule {}
