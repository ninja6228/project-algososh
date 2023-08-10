type TQueue<T> = {
  enqueue: (item: T) => void
  dequeue: () => void
  reset: () => void
  getElements: () => (T | null)[]
}

export class Queue<T> implements TQueue<T> {
  private container: (T | null)[] = [];
  public head = 0;
  public tail = 0;
  public readonly size: number = 0;
  public length = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    delete this.container[this.head % this.size]
    this.head++
  };

  reset = (): void => {
    this.container = Array(this.size);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  }

  getElements = (): (T | null)[] => this.container
}