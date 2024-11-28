export class GetProductByIdRequestDTO {
  id: string;
}

export class GetProductByIdResponseDTO {
  product: {
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
  };
}
