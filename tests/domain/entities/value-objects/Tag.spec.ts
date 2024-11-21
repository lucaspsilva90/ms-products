import { Tag } from '../../../../src/domain/entities/value-objects/Tag';

test('should be able to create a tag successfully', () => {
  const tag = new Tag('Mock tag');

  expect(tag).toBeTruthy();
  expect(tag).toBeInstanceOf(Tag);
  expect(tag.toString()).toBe('Mock tag');
});

test('should throw and error trying to create a empty tag', () => {
  expect(() => new Tag('')).toThrow('Tag cannot by empty');
});
