import { Query, Resolver, Args } from '@nestjs/graphql';
import { Program } from './program.schema';
import { ProgramService } from './program.service';
import { ProgramFilters } from './dto/program-filters';

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
}
