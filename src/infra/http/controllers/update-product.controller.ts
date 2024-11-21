import { Body, Param, Patch } from '@nestjs/common';
import { UpdateProductUseCase } from 'src/domain/use-cases/update-product';
import {
  UpdateProductRequestDTO,
  UpdateProductResponseDTO,
} from '../dtos/update-product-dto';
import { ProductPresenter } from 'src/infra/presenters/product-presenter';

export class UpdateProductController {
  constructor(private readonly updateProductUseCase: UpdateProductUseCase) {}

  @Patch('/products/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() payload: UpdateProductRequestDTO,
  ): Promise<UpdateProductResponseDTO> {
    const response = await this.updateProductUseCase.execute({
      id,
      name: payload.name,
      description: payload.description,
      dimension: payload.dimensions,
      images: payload.images,
      tags: payload.tags,
      price: payload.price,
      isActive: payload.isActive,
    });

    return {
      message: response.message,
      product: ProductPresenter.toHTTP(response.product),
    };
  }
}
