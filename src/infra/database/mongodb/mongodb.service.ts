import { Injectable } from '@nestjs/common';
import { MongoClient, Db, Collection } from 'mongodb';
import { ICollectionOptions } from './interfaces/mongodb-options';
import { EnvService } from 'src/infra/env/env.service';

@Injectable()
export class MongoService {
  private client: MongoClient;
  private db: Db;

  constructor(private envService: EnvService) {}

  async connect(): Promise<void> {
    if (!this.client) {
      this.client = new MongoClient(this.envService.get('DATABASE_URL'), {
        minPoolSize: this.envService.get('DATABASE_MIN_POOL_SIZE'),
        maxPoolSize: this.envService.get('DATABASE_MAX_POOL_SIZE'),
      });
      await this.client.connect();
      this.db = this.client.db(this.envService.get('DATABASE_NAME'));
    }
  }

  async getCollection<T>(options: ICollectionOptions): Promise<Collection<T>> {
    if (!this.db) {
      await this.connect();
    }
    return this.db.collection<T>(options.collectionName);
  }

  async closeConnection(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}
