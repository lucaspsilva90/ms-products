import { Body, Post } from '@nestjs/common';
import { CreateProductUseCase } from '../../../../src/domain/use-cases/create-product';
import {
  CreateProductRequestDTO,
  CreateProductResponseDTO,
} from '../dtos/create-product-dto';
import { ProductPresenter } from 'src/infra/presenters/product-presenter';

export class CreateProductController {
  constructor(private readonly createProductUseCase: CreateProductUseCase) {}

  @Post('/products')
  async createProduct(
    @Body() product: CreateProductRequestDTO,
  ): Promise<CreateProductResponseDTO> {
    const response = await this.createProductUseCase.execute(product);

    return {
      message: response.message,
      product: ProductPresenter.toHTTP(response.product),
    };
  }
}
