import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramLoaderService } from './program-loader/program-loader.service';
import { ChannelsModule } from './channels/channels.module';
import { ProgramModule } from './programs/program.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://iljanest:Ilya02081994@cluster0.tk2fb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    ChannelsModule,
    ProgramModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [ProgramLoaderService],
})
export class AppModule {}
