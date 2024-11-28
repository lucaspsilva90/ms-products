import { Product } from 'src/domain/entities/Product';
import { ProductRepository } from 'src/domain/repositories/product-repository';

export class InMemoryProductRepository implements ProductRepository {
  async findById(id: string): Promise<Product> {
    const product = this.products.find(
      product => product.getId().toString() === id,
    );
    if (!product) {
      return null;
    }
    return product;
  }
  private products: Product[] = [];

  async findBySku(sku: string): Promise<Product> {
    const product = this.products.find(
      product => product.getSku().toString() === sku,
    );
    if (!product) {
      return null;
    }
    return product;
  }
  async findMany(
    filters: any,
    page: number = 1,
    limit: number = 10,
  ): Promise<Product[]> {
    const filteredProducts = this.products.filter(product => {
      return Object.entries(filters).every(([key, value]) => {
        const getterMethod = `get${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        if (typeof product[getterMethod] === 'function') {
          return product[getterMethod]() === value;
        }
        return false;
      });
    });

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    return Promise.resolve(paginatedProducts);
  }
  async create(product: Product): Promise<Product> {
    this.products.push(product);
    return product;
  }
  async update(product: Product): Promise<Product> {
    const index = this.products.findIndex(
      item => item.getId().toString() === product.getId().toString(),
    );

    if (index === -1) {
      throw new Error(`Product with ID ${product.getId.toString()} not found`);
    }

    this.products[index] = product;

    return this.products[index];
  }
  async deleteById(id: string): Promise<void> {
    this.products = this.products.filter(
      product => product.getId().toString() !== id,
    );
  }
}
