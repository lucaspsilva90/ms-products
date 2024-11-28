import { DomainError } from '../../core/errors/DomainError';

export class ProductNotFoundError extends DomainError {
  constructor(additionalData?: object) {
    super({
      message: 'Product not found',
      additionalData,
    });
  }
}
