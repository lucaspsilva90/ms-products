import { Product } from '../../../src/domain/entities/Product';
import { Dimension } from '../../../src/domain/entities/value-objects/Dimension';
import { Images } from '../../../src/domain/entities/value-objects/Images';
import { Tags } from '../../../src/domain/entities/value-objects/Tags';
import { ProductRepository } from '../../../src/domain/repositories/product-repository';
import { DeleteProductUseCase } from '../../../src/domain/use-cases/delete-product';
import { InMemoryProductRepository } from '../repositories/in-memory-product-repository';

let deleteProductUseCase: DeleteProductUseCase;
let productRepository: ProductRepository;

beforeEach(async () => {
  productRepository = new InMemoryProductRepository();
  deleteProductUseCase = new DeleteProductUseCase(productRepository);
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

describe('DeleteProductUseCase', () => {
  it('should delete a product', async () => {
    const product = await productRepository.findByName('Produto 1');
    await deleteProductUseCase.execute({
      productId: product.getId().toString(),
    });
    const productDeleted = await productRepository.findByName('Produto 1');
    expect(productDeleted).toEqual(null);
  });
  it('should throw an error when trying to delete a product that does not exist', async () => {
    await expect(
      deleteProductUseCase.execute({
        productId: '123',
      }),
    ).rejects.toThrow('Resource not found');
  });
});
