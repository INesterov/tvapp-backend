import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Channel, ChannelDocument } from './channel.schema';
import { CreateChannelDto } from './dto/create-channel';

@Injectable()
export class ChannelsService {
  constructor(
    @InjectModel(Channel.name) private channelModel: Model<ChannelDocument>,
  ) {}

  async create(createChannelDto: CreateChannelDto): Promise<Channel> {
    const channel = await this.channelModel.findOne({
      id: createChannelDto.id,
    });

    if (channel) return;

    const createdChannel = new this.channelModel(createChannelDto);
    return createdChannel.save();
  }
}
