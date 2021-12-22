import { Module } from '@nestjs/common';

import { Database } from '@common/database';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService, Database],
})
export class ApiModule {}
