import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ProductRepository } from '../repositories/product-repository';

interface DeleteProductUseCaseInput {
  productId: string;
}

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ productId }: DeleteProductUseCaseInput): Promise<void> {
    const productExists = await this.productRepository.findById(productId);
    if (!productExists) {
      throw new ResourceNotFoundError({
        additionalData: {
          resourceId: productId,
          resourceName: 'Product',
        },
      });
    }

    await this.productRepository.deleteById(productId);
  }
}
