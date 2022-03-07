import { Query, Resolver } from '@nestjs/graphql';
import { Channel } from './channel.schema';
import { ChannelsService } from './channels.service';

@Resolver(() => Channel)
export class ChannelsResolver {
  constructor(private readonly channelsService: ChannelsService) {}

  @Query(() => [Channel])
  channels(): Promise<Channel[]> {
    return this.channelsService.findAll();
  }
}
