import { Injectable } from '@nestjs/common';
import { Product } from '../entities/Product';
import { ProductNotFoundError } from '../errors/ProductNotFoundError';
import { ProductRepository } from '../repositories/product-repository';

interface GetProductBySkuInput {
  sku: string;
}

interface GetProductBySkuOutput {
  product: Product;
}

@Injectable()
export class GetProductBySkuUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ sku }: GetProductBySkuInput): Promise<GetProductBySkuOutput> {
    const product = await this.productRepository.findBySku(sku);

    if (!product) {
      throw new ProductNotFoundError({
        resourceType: 'Product',
      });
    }

    return {
      product,
    };
  }
}
