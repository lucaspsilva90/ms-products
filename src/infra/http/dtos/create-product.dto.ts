export class CreateProductRequestDTO {
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
}

export class CreateProductResponseDTO {
  message: string;
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
