// Build your stack class here.
class Stack {
  constructor() {
    this.data = [];
  }

  push(value) {
    this.data.push(value);
  }
  pop() {
    return this.data.pop();
  }
  isEmpty() {
    return this.data.length === 0;
  }
  clear() {
    this.data = [];
  }
}
export default Stack;
