import { ProductRepository } from '../../../../../src/domain/repositories/product-repository';
import { MongoService } from '../mongodb.service';
import { Product } from '../../../../../src/domain/entities/Product';
import { MongoProductMapper } from '../mappers/mongo-product-mapper';
import { Injectable } from '@nestjs/common';
import { Collection } from 'mongodb';
import { TProduct } from '../types/product.type';
import { IMongoProduct } from '../dto/mongo-product.dto';

interface ProductFilters {
  name?: string;
  price?: number;
  isActive?: boolean;
  tags?: string[];
}

@Injectable()
export class MongoDBProductRepository implements ProductRepository {
  constructor(private db: MongoService) {}
  async findBySku(sku: string): Promise<Product> {
    const productsCollection = await this.db.getCollection({
      collectionName: 'products',
    });

    const product = await productsCollection.findOne({ sku });

    if (!product) return null;

    return MongoProductMapper.toDomain(product);
  }
  async findMany(
    { name, isActive, price, tags }: ProductFilters,
    pageNumber?: number,
    limit?: number,
    operation?: string,
  ): Promise<Product[]> {
    const productsCollection = await this.db.getCollection({
      collectionName: 'products',
    });

    const operator = operation === 'and' ? '$and' : '$or';

    const filters = [];

    const conditions = [
      name && { name: { $regex: name, $options: 'i' } },
      price && { price: { $lte: +price } },
      isActive !== undefined && { isActive },
      tags?.length > 0 && { tags: { $in: tags } },
    ].filter(Boolean);

    filters.push(...conditions);

    const query = filters.length > 0 ? { [operator]: filters } : {};

    const products = await productsCollection
      .find(query)
      .skip((pageNumber - 1) * limit)
      .limit(limit)
      .toArray();

    return products.map(MongoProductMapper.toDomain);
  }
  async findById(id: string): Promise<Product> {
    const productsCollection: Collection<TProduct> =
      await this.db.getCollection({
        collectionName: 'products',
      });

    const product = await productsCollection.findOne<TProduct>({ _id: id });

    if (!product) return null;

    return MongoProductMapper.toDomain(product);
  }
  async create(product: Product): Promise<Product> {
    const productsCollection = await this.db.getCollection({
      collectionName: 'products',
    });

    const productToCreate = MongoProductMapper.toPersistence(product);

    const { acknowledged } =
      await productsCollection.insertOne(productToCreate);

    if (acknowledged) return product;

    return null;
  }
  async update(product: Product): Promise<Product> {
    const productsCollection: Collection<TProduct> =
      await this.db.getCollection({
        collectionName: 'products',
      });

    const productToUpdate: IMongoProduct =
      MongoProductMapper.toPersistence(product);
    const { acknowledged } = await productsCollection.updateOne(
      { _id: productToUpdate._id },
      { $set: productToUpdate },
    );

    if (acknowledged) return product;

    return null;
  }
  async deleteById(id: string): Promise<void> {
    const productsCollection: Collection<TProduct> =
      await this.db.getCollection({
        collectionName: 'products',
      });

    await productsCollection.deleteOne({ _id: id });
  }
}
