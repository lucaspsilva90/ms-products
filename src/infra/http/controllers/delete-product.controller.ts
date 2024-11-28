import { Delete, Param } from '@nestjs/common/decorators/http';
import { DeleteProductUseCase } from '../../../../src/domain/use-cases/delete-product';
import { Controller, UseFilters } from '@nestjs/common';
import { DomainExceptionFilter } from '../filters/domain-exception.filter';

@Controller('')
export class DeleteProductController {
  constructor(private readonly deleteProductUseCase: DeleteProductUseCase) {}

  @Delete('/products/:id')
  @UseFilters(DomainExceptionFilter)
  async handle(@Param('id') id: string): Promise<void> {
    await this.deleteProductUseCase.execute({ id });
  }
}
