import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { XapiModule } from './xapi/xapi.module';
import { DatabaseModule } from '@weplanx/database';

@Module({
  imports: [ConfigModule.forRoot(), DatabaseModule.fromMongo(), XapiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
