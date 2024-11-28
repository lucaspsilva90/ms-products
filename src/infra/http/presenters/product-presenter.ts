import { Product } from '../../../../src/domain/entities/Product';

export class ProductPresenter {
  static toHTTP(product: Product) {
    return {
      id: product.getId().toString(),
      name: product.getName(),
      sku: product.getSku().toString(),
      description: product.getDescription(),
      price: product.getPrice(),
      images: product.getImages().toArray(),
      dimensions: {
        height: product.getDimensions().getHeight(),
        width: product.getDimensions().getWidth(),
        length: product.getDimensions().getLength(),
      },
      tags: product.getTags().toArray(),
      isActive: product.getIsActive(),
    };
  }
}
