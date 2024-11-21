import { DomainError } from '../../../src/core/errors/DomainError';

export class ResourceNotFoundError extends DomainError {
  constructor(additionalData?: object) {
    super({
      message: 'Resource not found',
      additionalData,
    });
  }
}
