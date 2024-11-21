import { ProductRepository } from '../../../src/domain/repositories/product-repository';
import { CreateProductUseCase } from '../../../src/domain/use-cases/create-product';
import { InMemoryProductRepository } from '../repositories/in-memory-product-repository';

let createProductUseCase: CreateProductUseCase;
let productRepository: ProductRepository;

beforeEach(() => {
  productRepository = new InMemoryProductRepository();
  createProductUseCase = new CreateProductUseCase(productRepository);
});

describe('tests for create product use case', () => {
  it('should be able to create product', async () => {
    const payload = {
      name: 'Produto 1',
      description: 'Caminha',
      price: 10,
      dimensions: {
        height: 10,
        width: 10,
        length: 10,
      },
      images: ['123'],
      tags: ['pet', 'rato'],
      isActive: true,
    };

    const response = await createProductUseCase.execute(payload);

    expect(response.message).toEqual('Product created successfully');
  });
  it('should thow an error to create product with the same name', async () => {
    const payload = {
      name: 'Produto 1',
      description: 'Caminha',
      price: 10,
      dimensions: {
        height: 10,
        width: 10,
        length: 10,
      },
      images: ['123'],
      tags: ['pet', 'rato'],
      isActive: true,
    };

    await createProductUseCase.execute(payload);

    expect(
      async () => await createProductUseCase.execute(payload),
    ).rejects.toThrow('Resource Already Exists');
  });
});
