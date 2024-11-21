import { Product } from '../../../src/domain/entities/Product';
import { Dimension } from '../../../src/domain/entities/value-objects/Dimension';
import { Images } from '../../../src/domain/entities/value-objects/Images';
import { Tags } from '../../../src/domain/entities/value-objects/Tags';
import { InMemoryProductRepository } from '../repositories/in-memory-product-repository';
import { ProductRepository } from '../../../src/domain/repositories/product-repository';
import { GetProductByIdUseCase } from '../../../src/domain/use-cases/get-product-by-id';
import { randomUUID } from 'crypto';

describe('get product by id', () => {
  let getProductByIdUseCase: GetProductByIdUseCase;
  let productRepository: ProductRepository;

  beforeEach(async () => {
    productRepository = new InMemoryProductRepository();
    getProductByIdUseCase = new GetProductByIdUseCase(productRepository);
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
  });

  it('should be able to get a product by its ID', async () => {
    const p = await productRepository.findByName('Produto 1');
    const id = p.getId().toString();

    const product = await getProductByIdUseCase.execute({
      id,
    });

    expect(product).toEqual({
      product: expect.any(Product),
    });
  });

  it('should throw an error if the product does not exist', async () => {
    await expect(
      getProductByIdUseCase.execute({
        id: randomUUID(),
      }),
    ).rejects.toThrow('Resource not found');
  });
});
