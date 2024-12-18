import { Body, Controller, Param, Patch, UseFilters } from '@nestjs/common';
import { UpdateProductUseCase } from '../../../../src/domain/use-cases/update-product';
import {
  UpdateProductRequestDTO,
  UpdateProductResponseDTO,
} from '../dtos/update-product.dto';
import { ProductPresenter } from '../presenters/product-presenter';
import { DomainExceptionFilter } from '../filters/domain-exception.filter';

@Controller('')
export class UpdateProductController {
  constructor(private readonly updateProductUseCase: UpdateProductUseCase) {}

  @Patch('/products/:id')
  @UseFilters(DomainExceptionFilter)
  async handle(
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
