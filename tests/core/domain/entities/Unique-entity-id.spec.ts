import { UniqueEntityID } from '../../../../src/core/entities/Unique-entity-id';
import { randomUUID } from 'node:crypto';

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn(() => 'mocked-uuid'),
}));

describe('UniqueEntityID', () => {
  it('should create a new ID if no value is provided', () => {
    const uniqueId = new UniqueEntityID();

    expect(uniqueId.toValue()).toBe('mocked-uuid');
    expect(randomUUID).toHaveBeenCalled();
  });

  it('should return the value as a string using toString', () => {
    const customValue = 'custom-uuid';
    const uniqueId = new UniqueEntityID(customValue);

    expect(uniqueId.toString()).toBe(customValue);
  });

  it('should compare equality with another UniqueEntityID instance', () => {
    const value = 'same-uuid';
    const id1 = new UniqueEntityID(value);
    const id2 = new UniqueEntityID(value);

    expect(id1.equals(id2)).toBe(true);
  });

  it('should return false when comparing different UniqueEntityID instances', () => {
    const id1 = new UniqueEntityID('uuid-1');
    const id2 = new UniqueEntityID('uuid-2');

    expect(id1.equals(id2)).toBe(false);
  });

  it('should return true when comparing with itself', () => {
    const id = new UniqueEntityID();

    expect(id.equals(id)).toBe(true);
  });
});
