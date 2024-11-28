export class Sku {
  private value: string;

  constructor(value: string) {
    this.value = this.generate(value);
  }

  private generate(name: string): string {
    if (!name.trim()) {
      throw new Error('Name cannot be blank');
    }
    return name.trim().toLowerCase().replace(/\s+/g, '-');
  }

  toString(): string {
    return this.value;
  }
}
