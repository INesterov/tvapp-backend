import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Channel, ChannelSchema } from './channel.schema';
import { ChannelsService } from './channels.service';
import { ChannelsResolver } from './channels.resolvers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Channel.name, schema: ChannelSchema }]),
    Channel,
  ],
  providers: [ChannelsResolver, ChannelsService],
  exports: [ChannelsService, Channel],
})
export class ChannelsModule {}
