import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { GetProductByIdUseCase } from '../../../../src/domain/use-cases/get-product-by-id';
import { GetProductByIdResponseDTO } from '../dtos/get-product-by-id.dto';
import { ProductPresenter } from '../presenters/product-presenter';
import { DomainExceptionFilter } from '../filters/domain-exception.filter';

@Controller('')
export class GetProductByIdController {
  constructor(private readonly getProductByIdUseCase: GetProductByIdUseCase) {}

  @Get('/products/:id')
  @UseFilters(DomainExceptionFilter)
  async handle(@Param('id') id: string): Promise<GetProductByIdResponseDTO> {
    const response = await this.getProductByIdUseCase.execute({ id });

    return {
      product: ProductPresenter.toHTTP(response.product),
    };
  }
}
