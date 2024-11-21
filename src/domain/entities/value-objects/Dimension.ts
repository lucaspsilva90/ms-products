export interface IDimension {
  height: number;
  width: number;
  length: number;
}

export class Dimension {
  private height: number;
  private width: number;
  private length: number;
  private unit: string;

  constructor(
    height: number,
    width: number,
    length: number,
    unit: string = 'cm',
  ) {
    if (height <= 0 || width <= 0 || length <= 0) {
      throw Error('Dimension should be above 0');
    }
    this.height = height;
    this.width = width;
    this.length = length;
    this.unit = unit;
  }

  getHeight(): number {
    return this.height;
  }

  setHeight(value: number): void {
    if (value <= 0) throw Error('Dimension should be above 0');
    this.height = value;
  }

  getWidth(): number {
    return this.width;
  }

  setWidth(value: number): void {
    if (value <= 0) throw Error('Dimension should be above 0');
    this.width = value;
  }

  getLength(): number {
    return this.length;
  }

  setLength(value: number): void {
    if (value <= 0) throw Error('Dimension should be above 0');
    this.length = value;
  }

  getVolume(): number {
    return this.height * this.width * this.length;
  }

  toString(): string {
    return `${this.height}x${this.width}x${this.length} ${this.unit}`;
  }
}
