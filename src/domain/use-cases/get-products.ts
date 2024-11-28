import { Injectable } from '@nestjs/common';
import { Product } from '../entities/Product';
import { ProductRepository } from '../repositories/product-repository';
import { Operation } from '../enums/operation';

interface GetProductsInput {
  pageNumber: number;
  pageSize: number;
  filters: object;
  operation: Operation;
}

interface GetProductsOutput {
  pageNumber: number;
  pageSize: number;
  products: Product[];
}

@Injectable()
export class GetProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    filters,
    pageNumber,
    pageSize,
    operation,
  }: GetProductsInput): Promise<GetProductsOutput> {
    const products = await this.productRepository.findMany(
      filters,
      pageNumber,
      pageSize,
      operation,
    );

    return {
      pageSize,
      pageNumber,
      products,
    };
  }
}
