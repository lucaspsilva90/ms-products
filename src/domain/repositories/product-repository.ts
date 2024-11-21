import { Product } from '../entities/Product';

export abstract class ProductRepository {
  abstract findByName(name: string): Promise<Product>;
  abstract findMany(
    filters: object,
    pageNumber?: number,
    limit?: number,
  ): Promise<Product[]>;
  abstract findById(id: string): Promise<Product>;
  abstract create(product: Product): Promise<Product>;
  abstract update(id: string, product: Product): Promise<Product>;
  abstract deleteById(id: string): Promise<void>;
}
