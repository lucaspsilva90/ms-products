import { Tag } from './Tag';

export class Tags {
  private tags: Tag[];

  constructor(tags: string[]) {
    this.tags = tags.map(tag => new Tag(tag));
  }

  count(): number {
    return this.tags.length;
  }

  add(tag: string): void {
    this.tags.push(new Tag(tag));
  }

  toString(): string {
    return this.tags.map(tag => tag.toString()).join(', ');
  }

  toArray(): string[] {
    return this.tags.map(tag => tag.toString());
  }
}
