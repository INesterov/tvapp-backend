import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { getUnixTime, startOfWeek, addDays, addHours } from 'date-fns';
import { ChannelsService } from '../channels/channels.service';
import { ProgramService } from '../programs/program.service';

@Injectable()
export class ProgramLoaderService {
  constructor(
    private channelsService: ChannelsService,
    private programsService: ProgramService,
  ) {}

  @Cron('0 0 0 * * 1')
  async handleCron() {
    const currentWeek = getUnixTime(addHours(startOfWeek(new Date()), 23));
    const startDay = addHours(startOfWeek(new Date()), 23);

    await this.programsService.clear(currentWeek);

    for (let i = 0; i <= 6; i++) {
      const day = getUnixTime(addDays(startDay, i));
      const { data } = await axios.get(
        `http://tvget.ru/tvgate/mv/zh9d3x6v/tv_ajax.php?action=tvsched&day=${i}&channel=cen&week=${currentWeek}&date_day=${day}`,
      );

      data.data.forEach(async (channel) => {
        const channelId = channel.channel_id;

        await this.channelsService.create({
          id: channelId,
          title: channel.channel_name,
        });

        channel.tvsched.forEach(async (programm) => {
          await this.programsService.create({
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
