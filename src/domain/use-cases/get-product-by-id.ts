import { Injectable } from '@nestjs/common';
import { Product } from '../entities/Product';
import { ProductNotFoundError } from '../errors/ProductNotFoundError';
import { ProductRepository } from '../repositories/product-repository';

interface GetProductByIdInput {
  id: string;
}

interface GetProductByIdOutput {
  product: Product;
}

@Injectable()
export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}
  async execute({ id }: GetProductByIdInput): Promise<GetProductByIdOutput> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ProductNotFoundError({
        resourceType: 'Product',
        resourceId: id,
      });
    }

    return {
      product,
    };
  }
}
