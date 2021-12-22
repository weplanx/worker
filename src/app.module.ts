import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Database } from '@common/database';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, Database],
})
export class AppModule {}
