export interface IMongoProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  dimensions: {
    width: number;
    height: number;
    length: number;
  };
  images: string[];
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
