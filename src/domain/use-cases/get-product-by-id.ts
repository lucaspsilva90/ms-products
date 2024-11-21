import { Product } from '../entities/Product';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ProductRepository } from '../repositories/product-repository';

interface GetProductByIdInput {
  id: string;
}

interface GetProductByIdOutput {
  product: Product;
}

export class GetProductByIdUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({ id }: GetProductByIdInput): Promise<GetProductByIdOutput> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError({
        resourceType: 'Product',
        resourceId: id,
      });
    }

    return {
      product,
    };
  }
}
