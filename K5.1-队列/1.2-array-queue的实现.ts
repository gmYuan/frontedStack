import { myArray } from "./1.1-array";

interface IMyQueue<T> {
  getSize(): number;
  isEmpty(): boolean;
  enqueue(e: T): void;
  dequeue(): T;
  getFront(): T;
}

class myQueue<E> implements IMyQueue<E> {
  arrayQueue: myArray<E>
  constructor(capacity = 10) {
    this.arrayQueue = new myArray(capacity);
  }

  getSize() {
    return this.arrayQueue.getsize();
  }

  isEmpty() {
    return this.arrayQueue.isEmpty();
  }

	getCapacity() {
		return this.arrayQueue.getCapacity()
	}

  enqueue<T>(item: T) {
		this.arrayQueue.addLast(item)
  }

	dequeue() {
		return this.arrayQueue.removeFirst()
	}

	getFront() {
		return this.arrayQueue.getFirst()
	}

}

// 测试用例
let test = new myQueue()
test.enqueue(1)
test.enqueue(2)
test.enqueue(3)
test.enqueue(4)
console.log('test1', test)

test.dequeue()
console.log('test2', test)
test.dequeue()
console.log('test3', test)
test.dequeue()
console.log('test4', test)
