import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { GetProductBySkuUseCase } from '../../../domain/use-cases/get-product-by-sku';
import { ProductPresenter } from '../presenters/product-presenter';
import { GetProductByNameResponseDTO } from '../dtos/get-product-by-name.dto';
import { DomainExceptionFilter } from '../filters/domain-exception.filter';

@Controller('')
export class GetProductByNameController {
  constructor(
    private readonly getProductBySkuUseCase: GetProductBySkuUseCase,
  ) {}

  @Get('/products/sku/:sku')
  @UseFilters(DomainExceptionFilter)
  async handle(
    @Param('sku') sku: string,
  ): Promise<GetProductByNameResponseDTO> {
    const response = await this.getProductBySkuUseCase.execute({ sku });

    return {
      product: ProductPresenter.toHTTP(response.product),
    };
  }
}
