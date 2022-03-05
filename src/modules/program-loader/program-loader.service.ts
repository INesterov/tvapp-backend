import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
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
    for (let i = 0; i <= 6; i++) {
      const { data } = await axios.get(
        `http://tvget.ru/tvframe/tv_ajax.php?action=tvsched&day=${i}&channel=cen&week=1645995600&date_day=1646514000`,
      );

      data.data.forEach(async (channel) => {
        await this.channelsService.create({
          id: channel.channel_id,
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
            channel_id: channel.channel_id,
          });
        });
      });
    }
  }
}
