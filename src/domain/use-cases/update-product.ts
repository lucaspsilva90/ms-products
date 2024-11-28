import { Injectable } from '@nestjs/common';
import { Product } from '../entities/Product';
import { Dimension } from '../entities/value-objects/Dimension';
import { Images } from '../entities/value-objects/Images';
import { Tags } from '../entities/value-objects/Tags';
import { ProductNotFoundError } from '../errors/ProductNotFoundError';
import { ProductRepository } from '../repositories/product-repository';

interface UpdateProductInput {
  id: string;
  name?: string;
  description?: string;
  price?: number;
  tags?: string[];
  images?: string[];
  dimension?: {
    width: number;
    height: number;
    length: number;
  };
  isActive?: boolean;
}

interface UpdateProductOutput {
  message: string;
  product: Product;
}

@Injectable()
export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute({
    id,
    name,
    dimension,
    description,
    price,
    tags,
    images,
    isActive,
  }: UpdateProductInput): Promise<UpdateProductOutput> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ProductNotFoundError({
        resourceType: 'Product',
        resourceId: id,
      });
    }

    if (name) {
      product.setName(name);
    }

    if (description) {
      product.setDescription(description);
    }

    if (price) {
      product.setPrice(price);
    }

    if (tags) {
      product.setTags(new Tags(tags));
    }

    if (images) {
      product.setImages(new Images(images));
    }

    if (dimension) {
      product.setDimensions(
        new Dimension(dimension.width, dimension.height, dimension.length),
      );
    }

    if (isActive !== undefined) {
      product.setIsActive(isActive);
    }

    const updatedProduct = await this.productRepository.update(product);

    return {
      message: 'Product updated successfully',
      product: updatedProduct,
    };
  }
}
