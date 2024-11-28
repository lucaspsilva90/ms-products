import { Operation } from 'src/domain/enums/operation';

export class GetProductsRequestDTO {
  pageSize: number;
  pageNumber: number;
  filters: {
    name: string;
    price: number;
    tags: string[];
    isActive: boolean;
  };
  operation: Operation;
}

export class GetProductsResponseDTO {
  pageSize: number;
  pageNumber: number;
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    dimensions: {
      height: number;
      width: number;
      length: number;
    };
    tags: string[];
    isActive: boolean;
  }[];
}
