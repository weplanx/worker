import { DynamicModule, Global, Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { MongoClient } from 'mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
            const uri = config.get('DATABASE_URI');
            const client = await MongoClient.connect(uri);
            return new Mongodb(client, client.db('weplanx'));
          },
          inject: [ConfigService],
        },
      ],
      exports: [DatabaseService],
    };
  }
}
