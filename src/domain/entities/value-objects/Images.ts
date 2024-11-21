import { Image } from './Image';

export class Images {
  private images: Image[];

  constructor(images: string[]) {
    this.images = images.map(image => new Image(image));
  }

  count(): number {
    return this.images.length;
  }

  add(image: string): void {
    this.images.push(new Image(image));
  }

  toString(): string {
    return this.images.map(image => image.toString()).join(', ');
  }

  toArray(): string[] {
    return this.images.map(image => image.toString());
  }
}
