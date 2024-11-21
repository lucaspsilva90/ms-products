import { Entity } from '../../../../src/core/entities/Entity';
import { UniqueEntityID } from '../../../../src/core/entities/Unique-entity-id';

class TestEntity extends Entity<{ name: string }> {
  constructor(props: { name: string }, id?: UniqueEntityID) {
    super(props, id);
  }
}

describe('Entity', () => {
  it('should create an entity with a unique ID when no ID is provided', () => {
    const entity = new TestEntity({ name: 'Test' });

    expect(entity.getId()).toBeDefined();
    expect(entity.getId()).toBeInstanceOf(UniqueEntityID);
  });

  it('should use the provided ID if one is passed', () => {
    const customId = new UniqueEntityID();
    const entity = new TestEntity({ name: 'Test' }, customId);

    expect(entity.getId()).toBe(customId);
  });

  it('should compare two entities with the same ID as equal', () => {
    const id = new UniqueEntityID();
    const entity1 = new TestEntity({ name: 'Entity1' }, id);
    const entity2 = new TestEntity({ name: 'Entity2' }, id);

    expect(entity1.equals(entity2)).toBe(true);
  });

  it('should compare two entities with different IDs as not equal', () => {
    const entity1 = new TestEntity({ name: 'Entity1' });
    const entity2 = new TestEntity({ name: 'Entity2' });

    expect(entity1.equals(entity2)).toBe(false);
  });

  it('should compare an entity with itself as equal', () => {
    const entity = new TestEntity({ name: 'Entity' });

    expect(entity.equals(entity)).toBe(true);
  });
});
