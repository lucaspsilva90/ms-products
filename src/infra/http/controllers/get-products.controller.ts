import { Controller, Get, Query, UseFilters } from '@nestjs/common';
import { GetProductsUseCase } from '../../../../src/domain/use-cases/get-products';
import { ProductPresenter } from '../presenters/product-presenter';
import {
  GetProductsRequestDTO,
  GetProductsResponseDTO,
} from '../dtos/get-products.dto';
import { DomainExceptionFilter } from '../filters/domain-exception.filter';
import { Operation } from '../../../domain/enums/operation';

@Controller('')
export class GetProductsController {
  constructor(private readonly getProductsUseCase: GetProductsUseCase) {}

  @Get('/products')
  @UseFilters(DomainExceptionFilter)
  async handle(
    @Query('pageSize') pageSize: number,
    @Query('pageNumber') pageNumber: number,
    @Query('name') name: string,
    @Query('isActive') isActive: string,
    @Query('tags') tag: string,
    @Query('price') price: number,
    @Query('operation') operation: Operation = Operation.OR,
  ): Promise<GetProductsResponseDTO> {
    const payload: GetProductsRequestDTO = {
      pageSize,
      pageNumber,
      filters: {
        ...(name && { name }),
        ...(price && { price }),
        ...(isActive !== undefined && { isActive: isActive === 'true' }),
        tags: tag ? tag.split(',') : [],
      },
      ...(operation && { operation }),
    };

    const response = await this.getProductsUseCase.execute({
      pageSize: Number(payload.pageSize),
      pageNumber: Number(payload.pageNumber),
      filters: payload.filters,
      operation: payload.operation,
    });

    return {
      pageNumber: response.pageNumber,
      pageSize: response.pageSize,
      products: response.products.map(ProductPresenter.toHTTP),
    };
  }
}
