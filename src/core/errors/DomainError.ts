export interface DomainErrorProps {
  message: string;
  additionalData?: any;
}

export class DomainError extends Error {
  additionalData: any;

  constructor({ message, additionalData }: DomainErrorProps) {
    super(message);
    this.additionalData = additionalData;
  }
}
