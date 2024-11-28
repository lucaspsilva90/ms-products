export class GetProductByNameRequestDTO {
  name: string;
}

export class GetProductByNameResponseDTO {
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
