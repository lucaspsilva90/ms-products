import { Product } from '../../../../../src/domain/entities/Product';
import { Dimension } from '../../../../../src/domain/entities/value-objects/Dimension';
import { Images } from '../../../../../src/domain/entities/value-objects/Images';
import { Tags } from '../../../../../src/domain/entities/value-objects/Tags';
import { UniqueEntityID } from '../../../../../src/core/entities/Unique-entity-id';

export class MongoProductMapper {
  static toDomain(product: any): Product {
    return Product.create(
      {
        name: product.name,
        price: product.price,
        sku: product.sku,
        description: product.description,
        dimensions: new Dimension(
          product.dimensions.width,
          product.dimensions.height,
          product.dimensions.length,
        ),
        images: new Images(product.images),
        tags: new Tags(product.tags),
        isActive: product.isActive,
      },
      new UniqueEntityID(product._id.toString()),
    );
  }

  static toPersistence(product: Product): any {
    return {
      _id: product.getId().toString(),
      name: product.getName(),
      price: product.getPrice(),
      sku: product.getSku().toString(),
      description: product.getDescription(),
      dimensions: {
        width: product.getDimensions().getWidth(),
        height: product.getDimensions().getHeight(),
        length: product.getDimensions().getLength(),
      },
      images: product.getImages().toArray(),
      tags: product.getTags().toArray(),
      isActive: product.getIsActive(),
    };
  }
}
