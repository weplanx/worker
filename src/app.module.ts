import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Database } from '@common/database';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiModule,
    PagesModule,
  ],
  controllers: [AppController],
  providers: [AppService, Database],
})
export class AppModule {}
