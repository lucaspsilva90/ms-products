import { Module } from '@nestjs/common';
import { CreateProductController } from './controllers/create-product.controller';
import { GetProductByIdController } from './controllers/get-product-by-id.controller';
import { GetProductByNameController } from './controllers/get-product-by-name.controller';
import { GetProductsController } from './controllers/get-products.controller';
import { UpdateProductController } from './controllers/update-product.controller';
import { DeleteProductController } from './controllers/delete-product.controller';
import { DatabaseModule } from '../database/database.module';
import { CreateProductUseCase } from '../../../src/domain/use-cases/create-product';
import { GetProductByIdUseCase } from '../../../src/domain/use-cases/get-product-by-id';
import { GetProductBySkuUseCase } from '../../domain/use-cases/get-product-by-sku';
import { UpdateProductUseCase } from '../../../src/domain/use-cases/update-product';
import { GetProductsUseCase } from '../../../src/domain/use-cases/get-products';
import { DeleteProductUseCase } from '../../../src/domain/use-cases/delete-product';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateProductController,
    GetProductByIdController,
    GetProductByNameController,
    GetProductsController,
    UpdateProductController,
    DeleteProductController,
  ],
  providers: [
    CreateProductUseCase,
    GetProductByIdUseCase,
    GetProductBySkuUseCase,
    GetProductsUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
  ],
})
export class HttpModule {}
