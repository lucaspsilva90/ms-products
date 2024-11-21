import { Images } from '../../../src/domain/entities/value-objects/Images';
import { Product } from '../../../src/domain/entities/Product';
import { ProductRepository } from '../../../src/domain/repositories/product-repository';
import { GetProductsUseCase } from '../../../src/domain/use-cases/get-products';
import { InMemoryProductRepository } from '../repositories/in-memory-product-repository';
import { Tags } from '../../../src/domain/entities/value-objects/Tags';
import { Dimension } from '../../../src/domain/entities/value-objects/Dimension';

let getProductsUseCase: GetProductsUseCase;
let productRepository: ProductRepository;

beforeEach(async () => {
  productRepository = new InMemoryProductRepository();
  getProductsUseCase = new GetProductsUseCase(productRepository);
  await productRepository.create(
    Product.create({
      name: 'Produto 1',
      price: 100,
      tags: new Tags(['tag1', 'tag2']),
      images: new Images(['image1', 'image2']),
      description: 'Descrição do produto 1',
      dimensions: new Dimension(10, 10, 10),
      isActive: true,
    }),
  );
  await productRepository.create(
    Product.create({
      name: 'Produto 2',
      price: 100,
      tags: new Tags(['tag1', 'tag2']),
      images: new Images(['image1', 'image2']),
      description: 'Descrição do produto 1',
      dimensions: new Dimension(10, 10, 10),
      isActive: true,
    }),
  );
  await productRepository.create(
    Product.create({
      name: 'Produto 3',
      price: 100,
      tags: new Tags(['tag1', 'tag2']),
      images: new Images(['image1', 'image2']),
      description: 'Descrição do produto 1',
      dimensions: new Dimension(10, 10, 10),
      isActive: true,
    }),
  );
  await productRepository.create(
    Product.create({
      name: 'Produto 4',
      price: 100,
      tags: new Tags(['tag1', 'tag2']),
      images: new Images(['image1', 'image2']),
      description: 'Descrição do produto 1',
      dimensions: new Dimension(10, 10, 10),
      isActive: true,
    }),
  );
  await productRepository.create(
    Product.create({
      name: 'Produto 5',
      price: 100,
      tags: new Tags(['tag1', 'tag2']),
      images: new Images(['image1', 'image2']),
      description: 'Descrição do produto 1',
      dimensions: new Dimension(10, 10, 10),
      isActive: true,
    }),
  );
});

describe('get products', () => {
  it('should be able to get products using filters', async () => {
    const payload = {
      filters: {
        name: 'Produto 1',
      },
      limit: 10,
      pageNumber: 1,
    };

    const response = await getProductsUseCase.execute(payload);

    expect(response.pageNumber).toBe(1);
    expect(response.limit).toBe(10);
    expect(response.products).toEqual(expect.any(Array));
    expect(response.products.length).toEqual(1);
  });

  it('should return an empty array if no products match the filters', async () => {
    const payload = {
      filters: {
        name: 'Nonexistent Product',
      },
      limit: 10,
      pageNumber: 1,
    };

    const response = await getProductsUseCase.execute(payload);

    expect(response.pageNumber).toBe(1);
    expect(response.limit).toBe(10);
    expect(response.products).toEqual([]);
  });

  it('should return the correct number of products based on the limit', async () => {
    const payload = {
      filters: {},
      limit: 5,
      pageNumber: 1,
    };

    const response = await getProductsUseCase.execute(payload);

    expect(response.pageNumber).toBe(1);
    expect(response.limit).toBe(5);
    expect(response.products.length).toBeLessThanOrEqual(5);
  });

  it('should return the correct page number', async () => {
    const payload = {
      filters: {},
      limit: 10,
      pageNumber: 2,
    };

    const response = await getProductsUseCase.execute(payload);

    expect(response.pageNumber).toBe(2);
    expect(response.limit).toBe(10);
    expect(response.products).toEqual(expect.any(Array));
  });
});
