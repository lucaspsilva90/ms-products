import { Images } from '../../../../src/domain/entities/value-objects/Images';

test('should be able to create an array of tags', () => {
  const images = new Images(['s3/image1', 's3/image2', 's3/image3']);

  expect(images.toArray()).toEqual(['s3/image1', 's3/image2', 's3/image3']);
  expect(images.count()).toBe(3);
});

test('should be able to add tag in an array of tags', () => {
  const images = new Images(['s3/image1', 's3/image2', 's3/image3']);

  images.add('s3/image4');

  expect(images).toBeTruthy();
  expect(images.count()).toBe(4);
});

test('should be able to add tag in an array of tags', () => {
  const images = new Images(['s3/image1', 's3/image2', 's3/image3']);

  expect(typeof images.toString() === 'string').toBeTruthy();
});
