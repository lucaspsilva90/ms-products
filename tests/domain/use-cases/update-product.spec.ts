import { UpdateProductUseCase } from '../../../src/domain/use-cases/update-product';
import { InMemoryProductRepository } from '../repositories/in-memory-product-repository';
import { Product } from '../../../src/domain/entities/Product';
import { Tags } from '../../../src/domain/entities/value-objects/Tags';
import { Images } from '../../../src/domain/entities/value-objects/Images';
import { Dimension } from '../../../src/domain/entities/value-objects/Dimension';
import { ProductRepository } from '../../../src/domain/repositories/product-repository';

let updateProductUseCase: UpdateProductUseCase;
let productRepository: ProductRepository;

beforeEach(async () => {
  productRepository = new InMemoryProductRepository();
  updateProductUseCase = new UpdateProductUseCase(productRepository);

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

describe('update product', () => {
  it('should be able to update a product', async () => {
    const p = await productRepository.findByName('Produto 1');
    const id = p.getId().toString();

    const product = await updateProductUseCase.execute({
      id,
      name: 'Produto 2',
      price: 200,
      tags: ['tag3', 'tag4'],
      images: ['image3', 'image4'],
      description: 'Descrição do produto 2',
      dimension: {
        width: 20,
        height: 20,
        length: 20,
      },
      isActive: false,
    });

    expect(product).toEqual({
      product: expect.any(Product),
    });
  });

  it('should throw an error if the product does not exist', async () => {
    await expect(
      updateProductUseCase.execute({
        id: 'invalid-id',
        name: 'Produto 2',
        price: 200,
        tags: ['tag3', 'tag4'],
        images: ['image3', 'image4'],
        description: 'Descrição do produto 2',
        dimension: {
          width: 20,
          height: 20,
          length: 20,
        },
        isActive: false,
      }),
    ).rejects.toThrow('Resource not found');
  });
});
