import { Dimension } from '../../../../src/domain/entities/value-objects/Dimension';

it('should create dimensions successfully', () => {
  const height = 10;
  const width = 15;
  const length = 20;

  const dimensions = new Dimension(height, width, length);

  expect(dimensions.getHeight()).toBe(height);
  expect(dimensions.getWidth()).toBe(width);
  expect(dimensions.getLength()).toBe(length);
  expect(dimensions.getVolume()).toBe(height * width * length);
});

it('should be able to set a new height', () => {
  const height = 10;
  const width = 15;
  const length = 20;

  const dimensions = new Dimension(height, width, length);

  const newHeight = 30;

  dimensions.setHeight(30);

  expect(dimensions.getHeight()).toBe(newHeight);
});

it('should be able to set a new width', () => {
  const height = 10;
  const width = 15;
  const length = 20;

  const dimensions = new Dimension(height, width, length);

  const newWidth = 30;

  dimensions.setWidth(30);

  expect(dimensions.getWidth()).toBe(newWidth);
});

it('should be able to set a new length', () => {
  const height = 10;
  const width = 15;
  const length = 20;

  const dimensions = new Dimension(height, width, length);

  const newLength = 30;

  dimensions.setLength(30);

  expect(dimensions.getLength()).toBe(newLength);
});

it('should throw error when try to create a dimension with any value less or equal 0', () => {
  expect(() => new Dimension(-15, 0, 0)).toThrow('Dimension should be above 0');
  expect(() => new Dimension(1, 0, 0)).toThrow('Dimension should be above 0');
});

it('should thow error when try to set a height less than 0', () => {
  const height = 10;
  const width = 15;
  const length = 20;

  const dimensions = new Dimension(height, width, length);

  const invalidHeight = 0;

  expect(() => dimensions.setHeight(invalidHeight)).toThrow(
    'Dimension should be above 0',
  );
});

it('should thow error when try to set a width less than 0', () => {
  const height = 10;
  const width = 15;
  const length = 20;

  const dimensions = new Dimension(height, width, length);

  const invalidWidth = 0;

  expect(() => dimensions.setWidth(invalidWidth)).toThrow(
    'Dimension should be above 0',
  );
});

it('should thow error when try to set a length less than 0', () => {
  const height = 10;
  const width = 15;
  const length = 20;

  const dimensions = new Dimension(height, width, length);

  const invalidLength = 0;

  expect(() => dimensions.setLength(invalidLength)).toThrow(
    'Dimension should be above 0',
  );
});

it('should return a string with dimension values', () => {
  const height = 10;
  const width = 15;
  const length = 20;
  const unit = 'cm';

  const dimensions = new Dimension(height, width, length);

  expect(typeof dimensions.toString() === 'string').toBeTruthy();
  expect(dimensions.toString()).toEqual(`${height}x${width}x${length} ${unit}`);
});
