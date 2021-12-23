import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { Database } from '@common/database';

@Module({
  providers: [PagesService, Database],
  controllers: [PagesController],
})
export class PagesModule {}
