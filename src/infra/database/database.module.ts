import { Module } from '@nestjs/common';
import { ProductRepository } from '../../../src/domain/repositories/product-repository';
import { MongoDBProductRepository } from './mongodb/repositories/product-repository';
import { MongoService } from './mongodb/mongodb.service';
import { EnvModule } from '../env/env.module';

@Module({
  imports: [EnvModule],
  providers: [
    MongoService,
    {
      provide: ProductRepository,
      useClass: MongoDBProductRepository,
    },
  ],
  exports: [ProductRepository],
})
export class DatabaseModule {}
