import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/product-repository';

interface GetProductsInput {
  pageNumber: number;
  limit: number;
  filters: object;
}

interface GetProductsOutput {
  pageNumber: number;
  limit: number;
  products: Product[];
}

export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    filters,
    pageNumber,
    limit,
  }: GetProductsInput): Promise<GetProductsOutput> {
    const products = await this.productRepository.findMany(
      filters,
      pageNumber,
      limit,
    );

    return {
      limit,
      pageNumber,
      products,
    };
  }
}
