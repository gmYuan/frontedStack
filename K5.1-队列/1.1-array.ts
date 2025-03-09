export class myArray<T> {
  capacity: number;
  size: number;
  data: T[];
  constructor(capacity: number = 10) {
    // 数组开辟的空间容量
    this.capacity = capacity;
    // 数组实际的成员个数; 下一个元素成员 待插入的位置
    this.size = 0;
    this.data = new Array(capacity);
  }
  // 获取数组的实际成员个数
  getsize() {
    return this.size;
  }
  // 获取当前数组的长度
  getCapacity() {
    return this.data.length;
  }
  // 返回数组是否为空
  isEmpty() {
    return this.size === 0;
  }

  //向所有元素后添加一个新元素
  addLast(e: any) {
    this.add(this.size, e);
  }
  // 在所有元素前添加一个新元素
  addFirst(e: any) {
    this.add(0, e);
  }
  //S1 在第index个位置插入一个新元素e
  add(index: number, e: any) {
    if (index < 0 || index > this.size) {
      throw new Error("Add failed. Require index >= 0 && index <= this.size");
    }
    // 当前数组已满时，动态数组-扩容1个系数
    if (this.size === this.data.length) {
      this.resize(2 * this.data.length);
    }

    // 向后拷贝/平移覆盖
    for (let i = this.size - 1; i >= index; i--) {
      this.data[i + 1] = this.data[i];
    }
    this.data[index] = e;
    this.size++;
  }

  // 获取index位置的元素
  get(index): T {
    if (index < 0 || index >= this.size) {
      throw new Error("Get failed. Index is illegal.");
    }
    return this.data[index];
  }

  getFirst() {
    return this.get(0)
  }

  getLast() {
    return this.get(this.size - 1)
  }

  // 修改index索引位置的元素为e
  set(index, e) {
    if (index < 0 || index >= this.size) {
      throw new Error("set failed. Index is illegal.");
    }
    this.data[index] = e;
  }

  //查找数组中是否有元素e
  contains(e) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) {
        return true;
      }
    }
    return false;
  }

  // 查找数组中元素e所在的索引，如果不存在元素e，则返回-1
  find(e) {
    for (let i = 0; i < this.size; i++) {
      if (this.data[i] === e) {
        return i;
      }
    }
    return -1;
  }

  //从数组中删除index位置的元素 + 返回删除的元素
  remove(index): T {
    if (index < 0 || index >= this.size) {
      throw new Error("Remove failed. Index is illegal.");
    }
    let res = this.data[index];
    for (let i = index + 1; i < this.size; i++) {
      this.data[i - 1] = this.data[i];
    }
    // 删除成功后要 更新size值
    this.size--;
    this.data[this.size] = null;
    // 当前数组实际成员是容量的1/4时，动态数组缩容1/2==> 避免复杂度震荡
    if (this.size === this.data.length / 4 && this.data.length / 2 >= 1) {
      this.resize(this.data.length / 2);
    }
    return res;
  }

  removeFirst() {
    return this.remove(0);
  }

  removeLast(): T {
    return this.remove(this.size - 1);
  }

  removeElement(e) {
    const index = this.find(e);
    if (index !== -1) {
      this.remove(index);
    }
  }
  // 修改数组容量
  resize(newCapacity: number) {
    let newArr = new Array(newCapacity);
    for (let i = 0; i < this.size; i++) {
      newArr[i] = this.data[i];
    }
    this.data = newArr;
  }
}
