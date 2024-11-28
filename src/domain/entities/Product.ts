import { Dimension } from './value-objects/Dimension';
import { Tags } from './value-objects/Tags';
import { Entity } from '../../../src/core/entities/Entity';
import { Images } from './value-objects/Images';
import { UniqueEntityID } from 'src/core/entities/Unique-entity-id';
import { Sku } from './value-objects/Sku';

interface ProductProps {
  name: string;
  sku?: Sku;
  description: string;
  price: number;
  stockId?: string;
  images: Images;
  dimensions: Dimension;
  isActive: boolean;
  tags: Tags;
}

export class Product extends Entity<ProductProps> {
  static create(props: ProductProps, id?: UniqueEntityID): Product {
    const product = new Product(
      {
        ...props,
      },
      id,
    );

    product.setSku(new Sku(props.name));

    return product;
  }

  getName(): string {
    return this.props.name;
  }

  setName(name: string): void {
    if (name.length === 0) throw Error("Name can't be empty");
    this.props.name = name;
  }

  getDescription(): string {
    return this.props.description;
  }

  setDescription(description: string): void {
    this.props.description = description;
  }

  getPrice(): number {
    return this.props.price;
  }

  setPrice(price: number): void {
    if (price <= 0) throw Error("Price can't be less than 0");
    this.props.price = price;
  }

  getImages(): Images {
    return this.props.images;
  }

  setImages(images: Images): void {
    this.props.images = images;
  }

  getDimensions(): Dimension {
    return this.props.dimensions;
  }

  setDimensions(dimensions: Dimension): void {
    this.props.dimensions = dimensions;
  }

  getIsActive(): boolean {
    return this.props.isActive;
  }

  setIsActive(value: boolean): void {
    this.props.isActive = value;
  }

  getTags(): Tags {
    return this.props.tags;
  }

  setTags(tags: Tags): void {
    this.props.tags = tags;
  }

  getSku(): Sku {
    return this.props.sku;
  }

  setSku(sku: Sku): void {
    this.props.sku = sku;
  }
}
