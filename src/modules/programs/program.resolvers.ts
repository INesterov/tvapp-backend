import { Query, Resolver } from '@nestjs/graphql';
import { Program } from './program.schema';
import { ProgramService } from './program.service';

@Resolver(() => Program)
export class ProgramsResolver {
  constructor(private readonly programsService: ProgramService) {}

  @Query(() => [Program])
  programs(): Promise<Program[]> {
    return this.programsService.findAll();
  }
}
