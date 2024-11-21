import { DomainError } from '../../../src/core/errors/DomainError';

export class ResourceAlreadyExistsError extends DomainError {
  constructor(additionalData?: object) {
    super({
      message: 'Resource Already Exists',
      additionalData,
    });
  }
}
