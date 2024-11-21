import { Tags } from '../../../../src/domain/entities/value-objects/Tags';

test('should be able to create an array of tags', () => {
  const tags = new Tags(['pet', 'twister', 'toca']);

  expect(tags).toBeTruthy();
  expect(tags.count()).toBe(3);
});

test('should be able to add tag in an array of tags', () => {
  const tags = new Tags(['pet', 'twister', 'toca']);

  tags.add('rato');

  expect(tags).toBeTruthy();
  expect(tags.count()).toBe(4);
});

test('should be able to add tag in an array of tags', () => {
  const tags = new Tags(['pet', 'twister', 'toca']);

  expect(typeof tags.toString() === 'string').toBeTruthy();
});
