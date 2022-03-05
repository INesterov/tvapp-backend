import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Program, ProgramDocument } from './program.schema';
import { CreateProgramDto } from './dto/create-program';

@Injectable()
export class ProgramService {
  constructor(
    @InjectModel(Program.name) private programModel: Model<ProgramDocument>,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    const createdProgram = new this.programModel(createProgramDto);
    return createdProgram.save();
  }
}
