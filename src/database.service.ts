import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Db, MongoClient } from 'mongodb';

@Injectable()
export class DatabaseService extends Db implements OnModuleInit {
  private client: MongoClient;

  constructor(config: ConfigService) {
    const dbURL = config.get<string>('DATABASE_URL');
    const dbName = config.get<string>('DATABASE_NAME');
    const client = new MongoClient(dbURL);
    super(client, dbName);
    this.client = client;
  }

  async onModuleInit() {
    await this.client.connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    await this.client.close();
    await app.close();
  }
}
