'use strict';

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyList {
  constructor() {
    this._length = 0;
    this._head = null;
  }

  /**
   * Add to list as head
   *
   * @param item
   */
  addFirst(item) {
    if (!this._head) {
      this._head = new Node(item);
    } else {
      const newNode = new Node(item);

      newNode.next = this._head;
      this._head = newNode;
    }

    this._length++;
  }

  /**
   * Add to list as tail
   *
   * @param item
   */
  addLast(item) {
    if (!this._head) {
      this._head = new Node(item);
    } else {
      const lastNode = this.getLast();

      lastNode.next = new Node(item);
    }

    this._length++;
  }

  /**
   * Add to list at specific index, in between existing items
   *
   * @param index
   * @param item
   */
  add(index, item) {
    if (index < 0 || index > this._length) {
      throw new RangeError(`index ${index} out of list bounds`);
    }

    if (index === 0) {
      return this.addFirst(item);
    } else if (index === this._length) {
      return this.addLast(item);
    }

    const node = this.get(index - 1);
    const newNode = new Node(item);

    newNode.next = node.next;
    node.next = newNode;

    this._length++;
  }

  /**
   * Get list item at head
   *
   * @returns {null|Node}
   */
  getFirst() {
    if (!this._head) {
      return null;
    }

    return this._head;
  }

  /**
   * Get list item at tail
   *
   * @returns {null|Node}
   */
  getLast() {
    if (!this._head) {
      return null;
    }

    let node = this._head;

    while (node.next) {
      node = node.next;
    }

    return node;
  }

  /**
   * Get list item at specific index
   *
   * @param index
   * @returns {Node}
   */
  get(index) {
    if (index < 0 || index >= this._length) {
      throw new RangeError(`index ${index} out of list bounds`);
    }

    let node = this._head;
    let _index = 0;

    while (index < this._length) {
      if (index === _index) {
        return node;
      }

      node = node.next;
      _index++;
    }
  }

  /**
   * Set list item data at specific index
   *
   * @param index
   * @param item
   */
  set(index, item) {
    if (index < 0 || index >= this._length) {
      throw new RangeError(`index ${index} out of list bounds`);
    }

    const node = this.get(index);

    node.data = item;
  }

  /**
   * Find list item index based on it's data
   *
   * @param item
   * @returns {number} The found item's index or -1
   */
  indexOf(item) {
    let node = this._head;
    let _index = 0;

    while (node) {
      if (node.data === item) {
        return _index;
      }

      node = node.next;
      _index++;
    }

    return -1;
  }

  /**
   * Remote list item at specific index
   *
   * @param index
   * @returns {string|null} The removed item
   */
  remove(index) {
    if (index < 0 || index >= this._length) {
      throw new RangeError(`index ${index} out of list bounds`);
    }

    let node = this._head;
    let prev = node;
    let _index = 0;

    if (index === 0) {
      return this.removeFirst();
    } else if (index === this._length - 1) {
      return this.removeLast();
    }

    while (_index !== index) {
      prev = node;
      node = node.next;
      _index++;
    }

    prev.next = node.next;
    this._length--;

    return node.data;
  }

  /**
   * Remove list item at list head
   *
   * @returns {string|null} The removed item
   */
  removeFirst() {
    if (!this._head) {
      return null;
    }

    const first = this._head;

    this._head = this._head.next || null;
    this._length--;

    return first.data;
  }

  /**
   * Remove list item at list tail
   *
   * @returns {string|null} The removed item
   */
  removeLast() {
    if (!this._head) {
      return null;
    } else if (this._length === 1) {
      const last = this._head;

      this._head = null;
      this._length--;

      return last.data;
    }

    let node = this._head;
    let _index = 0;

    while (_index < this._length - 2) {
      node = node.next;
      _index++;
    }

    const last = node.next;

    node.next = null;
    this._length--;

    return last.data;
  }

  /**
   * Get lists length
   *
   * @returns {number} The list length
   */
  size() {
    return this._length;
  }

  /**
   * Get all list items as an Array
   *
   * @returns {Array}
   */
  toArray() {
    if (!this._head) {
      return [];
    }

    const arr = [];
    let node = this._head;

    while (node) {
      arr.push(node.data);
      node = node.next;
    }

    return arr;
  }
}

module.exports = {
  SinglyList
};
