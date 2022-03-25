import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { addDays, fromUnixTime } from 'date-fns';
import axios from 'axios';
import { Model } from 'mongoose';
import { getUnixTime, startOfWeek, addHours } from 'date-fns';
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

  async findById(id: string): Promise<Program> {
    const program = await this.programModel.findById(id);

    return program;
  }

  async updatePrograms(): Promise<void> {
    const currentWeek = getUnixTime(addHours(startOfWeek(new Date()), 23));
    const startDay = addHours(startOfWeek(new Date()), 23);

    await this.clear(currentWeek);

    for (let i = 0; i <= 6; i++) {
      const day = getUnixTime(addDays(startDay, i));
      const { data } = await axios.get(
        `http://tvget.ru/tvgate/mv/zh9d3x6v/tv_ajax.php?action=tvsched&day=${i}&channel=cen&week=${currentWeek}&date_day=${day}`,
      );

      data.data.forEach(async (channel) => {
        const channelId = channel.channel_id;

        channel.tvsched.forEach(async (programm) => {
          await this.create({
            category: programm.attr_category,
            country: programm.attr_country,
            description: programm.attr_desc,
            photo: programm.attr_photo,
            title: programm.attr_title,
            type: programm.attr_type,
            year: programm.attr_year,
            day: programm.date_day,
            from: programm.date_from,
            to: programm.date_to,
            channel_id: channelId,
          });
        });
      });
    }
  }
}
