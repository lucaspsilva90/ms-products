import { MongoClientOptions } from 'mongodb';

export interface IMongoModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<IMongoModuleOptions>;
  inject?: any[];
}

export interface IMongoModuleOptions {
  uri: string;
  database: string;
  options?: MongoClientOptions;
}

export interface ICollectionOptions {
  collectionName: string;
}
