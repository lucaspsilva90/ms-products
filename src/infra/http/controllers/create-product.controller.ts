import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateProductUseCase } from '../../../../src/domain/use-cases/create-product';
import {
  CreateProductRequestDTO,
  CreateProductResponseDTO,
} from '../dtos/create-product.dto';
import { ProductPresenter } from '../presenters/product-presenter';
import { DomainExceptionFilter } from '../filters/domain-exception.filter';

@Controller('')
export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post('/products')
  @UseFilters(DomainExceptionFilter)
  async handle(
    @Body()
    {
      name,
      description,
      dimensions,
      images,
      isActive,
      price,
      tags,
    }: CreateProductRequestDTO,
  ): Promise<CreateProductResponseDTO> {
    const response = await this.createProductUseCase.execute({
      name,
      description,
      price,
      images,
      dimensions,
      isActive,
      tags,
    });

    return {
      message: response.message,
      product: ProductPresenter.toHTTP(response.product),
    };
  }
}
