import { Delete, Param } from '@nestjs/common/decorators/http';
import { DeleteProductUseCase } from 'src/domain/use-cases/delete-product';

export class DeleteProductController {
  constructor(private readonly deleteProductUseCase: DeleteProductUseCase) {}

  @Delete('/products/:id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    await this.deleteProductUseCase.execute({ productId: id });
  }
}
