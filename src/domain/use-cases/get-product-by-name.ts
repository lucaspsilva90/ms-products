import { Product } from '../entities/Product';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ProductRepository } from '../repositories/product-repository';

interface GetProductByNameInput {
  name: string;
}

interface GetProductByNameOutput {
  product: Product;
}

export class GetProductByNameUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    name,
  }: GetProductByNameInput): Promise<GetProductByNameOutput> {
    const product = await this.productRepository.findByName(name);

    if (!product) {
      throw new ResourceNotFoundError({
        resourceType: 'Product',
        resourceName: name,
      });
    }

    return {
      product,
    };
  }
}
