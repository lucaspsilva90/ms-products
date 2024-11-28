import { Sku } from '../../../../src/domain/entities/value-objects/Sku';

describe('Sku', () => {
  it('should generate a SKU from a name', () => {
    const sku = new Sku('Product Name');
    expect(sku.toString()).toBe('product-name');
  });

  it('should trim spaces from the name', () => {
    const sku = new Sku('  Product Name  ');
    expect(sku.toString()).toBe('product-name');
  });

  it('should handle multiple spaces between words', () => {
    const sku = new Sku('Product    Name');
    expect(sku.toString()).toBe('product-name');
  });

  it('should convert the name to lowercase', () => {
    const sku = new Sku('PRODUCT NAME');
    expect(sku.toString()).toBe('product-name');
  });

  it('should handle names with special characters', () => {
    const sku = new Sku('Product@Name!');
    expect(sku.toString()).toBe('product@name!');
  });

  it('should throw an error if the name is blank', () => {
    expect(() => new Sku('')).toThrow('Name cannot be blank');
  });

  it('should throw an error if the name is only spaces', () => {
    expect(() => new Sku('   ')).toThrow('Name cannot be blank');
  });
});
