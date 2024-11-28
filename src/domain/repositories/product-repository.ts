import { Product } from '../entities/Product';
import { Operation } from '../enums/operation';

export abstract class ProductRepository {
  abstract findBySku(sku: string): Promise<Product>;
  abstract findMany(
    filters: object,
    pageNumber?: number,
    limit?: number,
    operation?: Operation,
  ): Promise<Product[]>;
  abstract findById(id: string): Promise<Product>;
  abstract create(product: Product): Promise<Product>;
  abstract update(product: Product): Promise<Product>;
  abstract deleteById(id: string): Promise<void>;
}
