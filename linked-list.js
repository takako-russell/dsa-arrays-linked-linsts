/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  getNode(index) {
    let counter = 0;
    let curr = this.head;

    if (index < 0 || index >= this.length)
      throw new Error("Index out of bound");

    while (curr !== null && index !== counter) {
      counter += 1;
      curr = curr.next;
    }
    return curr;
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);

    if (!this.head) {
      this.tail = newNode;
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length += 1;
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    return this.getNode(idx).val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    let curr = this.getNode(idx);
    curr.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);

    if (idx === 0) return this.unshift(val);
    if (idx === this.length) return this.push(val);

    newNode.next = this.getNode(idx);
    this.getNode(idx - 1).next = newNode;

    this.length += 1;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error("Index out of bound");

    if (idx === 0) {
      let val = this.head.val;
      this.head = this.head.next;
      this.length -= 1;

      if (this.length < 2) {
        this.tail = this.head;
      }

      return val;
    }
    let val = this.getNode(idx).val;

    if (idx === this.length - 1) {
      this.tail = this.getNode(idx - 1);
      this.getNode(idx - 1).next = null;
      this.length -= 1;
      return val;
    }

    let prev = this.getNode(idx - 1);

    prev.next = this.getNode(idx).next;
    this.length -= 1;
    return val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let curr = this.head;
    let total = 0;

    while (curr) {
      total += curr.val;
      curr = curr.next;
    }
    return total / this.length;
  }
}

module.exports = LinkedList;
