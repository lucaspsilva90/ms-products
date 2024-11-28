import { DomainError } from '../../core/errors/DomainError';

export class ProductAlreadyExistsError extends DomainError {
  constructor(additionalData?: object) {
    super({
      message: 'Product Already Exists',
      additionalData,
    });
  }
}
