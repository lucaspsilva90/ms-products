export class Tag {
  value: string;

  constructor(value: string) {
    if (value.length === 0) throw new Error('Tag cannot by empty');
    this.value = value;
  }

  toString(): string {
    return this.value;
  }
}
