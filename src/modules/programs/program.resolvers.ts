import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { Program } from './program.schema';
import { ProgramService } from './program.service';
import { Messages, MessageType } from './dto/messages';

@Resolver(() => Program)
export class ProgramsResolver {
  constructor(private readonly programsService: ProgramService) {}

  @Query(() => [Program])
  programs(
    @Args('day', { type: () => String }) day: string,
    @Args('channel_id', { type: () => [String], nullable: true })
    channel_id: string,
    @Args('type', { type: () => [String], nullable: true })
    type: string,
  ): Promise<Program[]> {
    return this.programsService.findAll({ day, channel_id, type });
  }

  @Query(() => [String], { nullable: true })
  types(): Promise<string[]> {
    return this.programsService.getTypes();
  }

  @Query(() => Program)
  program(@Args('id', { type: () => String }) id: string): Promise<Program> {
    return this.programsService.findById(id);
  }

  @Mutation(() => String)
  updatePrograms(): string {
    this.programsService.updatePrograms();

    return Messages.UPDATED;
  }
}
