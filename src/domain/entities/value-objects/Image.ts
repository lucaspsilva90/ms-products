export class Image {
  value: string;

  constructor(value: string) {
    if (value.length === 0) throw new Error('Image cannot by empty');
    this.value = value;
  }

  toString(): string {
    return this.value;
  }
}
