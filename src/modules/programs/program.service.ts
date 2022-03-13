import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { addDays, fromUnixTime } from 'date-fns';
import { Model } from 'mongoose';
import { Program, ProgramDocument } from './program.schema';
import { CreateProgramDto } from './dto/create-program';
import { ProgramFilters } from './dto/program-filters';

@Injectable()
export class ProgramService {
  constructor(
    @InjectModel(Program.name) private programModel: Model<ProgramDocument>,
  ) {}

  async create(createProgramDto: CreateProgramDto): Promise<Program> {
    const createdProgram = new this.programModel(createProgramDto);
    return createdProgram.save();
  }

  async clear(week: number): Promise<any> {
    return this.programModel.deleteMany({ day: { $lt: week } });
  }

  async getTypes(): Promise<string[]> {
    const programs = await this.programModel.find();

    return Array.from(
      new Set(programs.map((program) => program.type || 'Передача')),
    );
  }

  async findAll(programFilters?: ProgramFilters): Promise<ProgramDocument[]> {
    const nextDay = addDays(fromUnixTime(Number(programFilters.day)), 1);
    const filters = {
      from: {
        $gt: programFilters.day,
        $lt: nextDay,
      },
    };

    if (programFilters.channel_id.length >= 1) {
      filters['channel_id'] = { $in: programFilters.channel_id };
    }

    if (programFilters.type.length >= 1) {
      filters['type'] = { $in: programFilters.type };
    }

    const programsList = await this.programModel
      .find(filters)
      .sort([['from', 1]]);

    return programsList;
  }
}
