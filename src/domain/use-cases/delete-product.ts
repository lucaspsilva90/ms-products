import { Injectable } from '@nestjs/common';
import { ProductNotFoundError } from '../errors/ProductNotFoundError';
import { ProductRepository } from '../repositories/product-repository';

interface DeleteProductUseCaseInput {
  id: string;
}

@Injectable()
export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ id }: DeleteProductUseCaseInput): Promise<void> {
    const productExists = await this.productRepository.findById(id);
    if (!productExists) {
      throw new ProductNotFoundError({
        additionalData: {
          resourceName: 'Product',
          resourceId: id,
        },
      });
    }

    await this.productRepository.deleteById(id);
  }
}
