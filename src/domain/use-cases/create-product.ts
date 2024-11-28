import { Injectable } from '@nestjs/common';
import { Product } from '../entities/Product';
import { Dimension, IDimension } from '../entities/value-objects/Dimension';
import { Images } from '../entities/value-objects/Images';
import { Tags } from '../entities/value-objects/Tags';
import { ProductAlreadyExistsError } from '../errors/ProductAlreadyExistsError';
import { ProductRepository } from '../repositories/product-repository';
import { Sku } from '../entities/value-objects/Sku';

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  images: string[];
  dimensions: IDimension;
  isActive: boolean;
  tags: string[];
}

export interface CreateProductOutput {
  message: string;
  product: Product;
}

@Injectable()
export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    name,
    description,
    price,
    images,
    dimensions,
    isActive,
    tags,
  }: CreateProductInput): Promise<CreateProductOutput> {
    const sku = new Sku(name);
    const productAlreadyExists = await this.productRepository.findBySku(
      sku.toString(),
    );

    if (productAlreadyExists) {
      throw new ProductAlreadyExistsError({
        productName: name,
      });
    }

    const product = Product.create({
      name,
      description,
      price,
      images: new Images(images),
      dimensions: new Dimension(
        dimensions.height,
        dimensions.width,
        dimensions.length,
      ),
      isActive,
      tags: new Tags(tags),
    });

    const createdProduct = await this.productRepository.create(product);

    return {
      message: 'Product created successfully',
      product: createdProduct,
    };
  }
}
