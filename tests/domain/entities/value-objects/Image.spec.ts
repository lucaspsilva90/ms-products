import { Image } from '../../../../src/domain/entities/value-objects/Image';

test('should be able to create a tag successfully', () => {
  const image = new Image('Mock image');

  expect(image).toBeTruthy();
  expect(image).toBeInstanceOf(Image);
  expect(image.toString()).toBe('Mock image');
});

test('should throw and error trying to create a empty tag', () => {
  expect(() => new Image('')).toThrow('Image cannot by empty');
});
