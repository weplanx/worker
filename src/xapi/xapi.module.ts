import { Module } from '@nestjs/common';

import { XapiController } from './xapi.controller';

@Module({
  controllers: [XapiController],
})
export class XapiModule {}
