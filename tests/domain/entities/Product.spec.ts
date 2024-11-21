import { Images } from '../../../src/domain/entities/value-objects/Images';
import { Product } from '../../../src/domain/entities/Product';
import { Dimension } from '../../../src/domain/entities/value-objects/Dimension';
import { Tags } from '../../../src/domain/entities/value-objects/Tags';

describe('successes', () => {
  test('should be able to create a Product', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    expect(product).toBeTruthy();
  });

  test('should be able to set a product name properly', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    const newName = 'Product 2';

    product.setName(newName);

    expect(product.getName()).toEqual(newName);
  });

  test('should be able to set a product description properly', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    const newDescription = 'New Description';

    product.setDescription(newDescription);

    expect(product.getDescription()).toEqual(newDescription);
  });

  test('should be able to set a product price properly', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    const newPrice = 12;

    product.setPrice(newPrice);

    expect(product.getPrice()).toEqual(newPrice);
  });

  test('should be able to get images properly', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    expect(product.getImages().toArray()).toEqual(['s3.bucket.images/1']);
    expect(product.getImages().count()).toEqual(1);
  });

  test('should be able to set images properly', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    const newImages = new Images(['s3.bucket.images/1', ' s3.bucket.images/2']);

    product.setImages(newImages);

    expect(product.getImages().count()).toEqual(2);
  });

  test('should be able to add image to current images', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    product.getImages().add('s3.bucket.images/2)');

    expect(product.getImages().count()).toEqual(2);
  });

  test('should be able to get the product dimensions', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    expect(product.getDimensions().toString()).toBe('10x10x10 cm');
  });

  test('should be able to set the product dimensions', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    const newDimension = new Dimension(20, 20, 20, 'cm');

    product.setDimensions(newDimension);

    expect(product.getDimensions().toString()).toBe('20x20x20 cm');
  });

  test('should be able to get the product active status', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    expect(product.getIsActive()).toBe(true);
  });

  test('should be able to set the product active status to false', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    const newIsActiveStatus = false;

    product.setIsActive(newIsActiveStatus);

    expect(product.getIsActive()).toBe(false);
  });

  test('should be able to get tags properly', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    expect(product.getTags().toArray()).toEqual(['fofinho', 'rato twister']);
  });

  test('should be able to set tags properly', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    const newTags = new Tags(['abc', 'defg']);

    product.setTags(newTags);

    expect(product.getTags().count()).toEqual(2);
  });
});

describe('errors', () => {
  test('should throw and error when try to set an empty name', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    expect(() => product.setName('')).toThrow("Name can't be empty");
  });

  test('should throw and error when try to set an negative price', () => {
    const productData = {
      name: 'Product 1',
      description: 'New Product',
      price: 10,
      dimensions: new Dimension(10, 10, 10, 'cm'),
      images: new Images(['s3.bucket.images/1']),
      isActive: true,
      tags: new Tags(['fofinho', 'rato twister']),
    };

    const product = Product.create(productData);

    expect(() => product.setPrice(-1)).toThrow("Price can't be less than 0");
  });
});
