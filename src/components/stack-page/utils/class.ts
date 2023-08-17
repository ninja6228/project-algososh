type TStack<T> = {
  push: (item: T) => void,
  pop: () => void,
  peak: () => T | null,
  getSize: () => number,
  reset: () => void
}

export class Stack<T> implements TStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item)
  };

  pop = (): void => {
    this.container.pop()
  };

  peak = (): T | null => {
    if (this.container.length) {
      return this.container[this.getSize() - 1]
    }
    return null;
  };

  reset = (): void => {
    this.container = []
  }

  getSize = () => this.container.length;

  getElements = () => this.container
};
