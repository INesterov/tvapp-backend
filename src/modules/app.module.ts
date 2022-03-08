import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { config } from 'dotenv';
import { ProgramLoaderService } from './program-loader/program-loader.service';
import { ChannelsModule } from './channels/channels.module';
import { ProgramModule } from './programs/program.module';

config();
@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb+srv://iljanest:${process.env.DB_PASS}@cluster0.tk2fb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    ),
    ChannelsModule,
    ProgramModule,
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,
      introspection: true,
    }),
  ],
  controllers: [],
  providers: [ProgramLoaderService],
})
export class AppModule {}
