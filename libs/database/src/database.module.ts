import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongoClient } from 'mongodb';

import { DatabaseService } from './database.service';
import { Mongodb } from './mongodb/mongodb';

@Global()
@Module({
  imports: [ConfigModule],
})
export class DatabaseModule {
  static fromMongo(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        DatabaseService,
        {
          provide: 'DATABASE',
          useFactory: async (config: ConfigService) => {
            const { uri, name } = config.get('database');
            const client = await MongoClient.connect(uri);
            return new Mongodb(client, client.db(name));
          },
          inject: [ConfigService],
        },
      ],
      exports: [DatabaseService],
    };
  }
}
