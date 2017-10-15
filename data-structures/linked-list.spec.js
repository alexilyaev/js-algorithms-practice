'use strict';

const { SinglyList } = require('./linked-list');

describe('SinglyList', () => {
  describe('addFirst', () => {
    it('should add items to the head of the list', () => {
      const list = new SinglyList();

      list.addFirst('John Doe');
      list.addFirst('Peter Pan');
      list.addFirst('Foo Bar');

      expect(list._head.data).toBe('Foo Bar');
      expect(list.get(0).data).toBe('Foo Bar');
      expect(list.get(1).data).toBe('Peter Pan');
      expect(list.get(2).data).toBe('John Doe');
    });
  });

  describe('addLast', () => {
    it('should add items to the tail of the list', () => {
      const list = new SinglyList();

      list.addLast('John Doe');
      list.addLast('Peter Pan');
      list.addLast('Foo Bar');

      expect(list._length).toBe(3);
      expect(list.get(0).data).toBe('John Doe');
      expect(list.get(1).data).toBe('Peter Pan');
      expect(list.get(2).data).toBe('Foo Bar');
    });
  });

  describe('add', () => {
    it('should throw RangeError if `index` out of range', () => {
      const list = new SinglyList();

      function catchWrap() {
        list.add(-1, 'John Doe');
      }

      expect(catchWrap).toThrowError(RangeError);
      expect(catchWrap).toThrowError('out of list bounds');
    });

    it('should call `addFirst` if the index is 0', () => {
      const list = new SinglyList();

      const spyAddFirst = jest.spyOn(list, 'addFirst').mockImplementationOnce(() => {});

      list.add(0, 'John Doe');
      expect(spyAddFirst).toHaveBeenCalledWith('John Doe');
    });

    it('should call `addLast` if the index is equal to list size', () => {
      const list = new SinglyList();

      const spyAddLast = jest.spyOn(list, 'addLast').mockImplementationOnce(() => {});

      list.addFirst('John Doe');
      list.add(1, 'Peter Pan');

      expect(spyAddLast).toHaveBeenCalledWith('Peter Pan');
    });

    it('should add items at a specific index', () => {
      const list = new SinglyList();

      list.add(0, 'John Doe');
      list.add(1, 'Peter Pan');
      list.add(1, 'Foo Bar');

      expect(list.get(0).data).toBe('John Doe');
      expect(list.get(2).data).toBe('Peter Pan');
      expect(list.get(1).data).toBe('Foo Bar');
    });
  });

  describe('getFirst', () => {
    it('should get the head item of the list', () => {
      const list = new SinglyList();

      expect(list.getFirst()).toBe(null);

      list.addLast('John Doe');
      expect(list.getFirst().data).toBe('John Doe');

      list.addLast('Peter Pan');
      expect(list.getFirst().data).toBe('John Doe');
    });
  });

  describe('getLast', () => {
    it('should get the tail item of the list', () => {
      const list = new SinglyList();

      expect(list.getLast()).toBe(null);

      list.addLast('John Doe');
      expect(list.getLast().data).toBe('John Doe');

      list.addLast('Peter Pan');
      expect(list.getLast().data).toBe('Peter Pan');
    });
  });

  describe('get', () => {
    // Regular `get` was already tested as part of `addFirst` test

    it('should throw RangeError when asked for an out of range index', () => {
      const list = new SinglyList();

      list.addFirst('John Doe');
      list.addFirst('Peter Pan');
      list.addFirst('Foo Bar');

      function catchWrap() {
        list.get(3);
      }

      expect(catchWrap).toThrowError(RangeError);
      expect(catchWrap).toThrowError('out of list bounds');
    });
  });

  describe('set', () => {
    it('should replace an existing item with given item', () => {
      const list = new SinglyList();

      list.addFirst('John Doe');
      list.addFirst('Peter Pan');
      list.set(1, 'Foo Bar');

      expect(list.get(1).data).toBe('Foo Bar');
    });

    it('should throw RangeError when asked for an out of range index', () => {
      const list = new SinglyList();

      list.addFirst('John Doe');
      list.addFirst('Peter Pan');

      function catchWrap() {
        list.set(2, 'Foo Bar');
      }

      expect(catchWrap).toThrowError(RangeError);
      expect(catchWrap).toThrowError('out of list bounds');
    });
  });

  describe('indexOf', () => {
    it('should return a list item index based on data', () => {
      const list = new SinglyList();

      list.addFirst('John Doe');
      list.addFirst('Peter Pan');
      list.addFirst('Foo Bar');

      expect(list.indexOf('Peter Pan')).toBe(1);
    });

    it('should return -1 if item was not found', () => {
      const list = new SinglyList();

      list.addFirst('John Doe');
      expect(list.indexOf('Peter Pan')).toBe(-1);
    });
  });

  describe('remove', () => {
    it('should throw RangeError when asked for an out of range index', () => {
      const list = new SinglyList();

      list.addFirst('John Doe');
      list.addFirst('Peter Pan');

      function catchWrap() {
        list.remove(2);
      }

      expect(catchWrap).toThrowError(RangeError);
      expect(catchWrap).toThrowError('out of list bounds');
    });

    it('should call `removeFirst` if the index is 0', () => {
      const list = new SinglyList();

      const spyRemoveFirst = jest.spyOn(list, 'removeFirst').mockImplementationOnce(() => {});

      list.addLast('John Doe');
      list.addLast('Peter Pan');
      list.remove(0);
      expect(spyRemoveFirst).toHaveBeenCalled();
    });

    it('should call `removeLast` if the index is of the last item', () => {
      const list = new SinglyList();
      const spyRemoveLast = jest.spyOn(list, 'removeLast').mockImplementationOnce(() => {});

      list.addLast('John Doe');
      list.addLast('Peter Pan');
      list.remove(1);
      expect(spyRemoveLast).toHaveBeenCalled();
    });

    it('should remove an item at a given index and return it', () => {
      const list = new SinglyList();

      list.addLast('John Doe');
      list.addLast('Peter Pan');
      list.addLast('Foo Bar');

      expect(list.remove(1)).toBe('Peter Pan');
      expect(list._length).toBe(2);
      expect(list.get(0).data).toBe('John Doe');
      expect(list.get(1).data).toBe('Foo Bar');

      list.remove(0);
      list.remove(0);
      expect(list._length).toBe(0);
      expect(list._head).toBe(null);
    });
  });

  describe('removeFirst', () => {
    it('should remove first item and return it', () => {
      const list = new SinglyList();

      list.addLast('John Doe');
      list.addLast('Peter Pan');
      list.addLast('Foo Bar');

      expect(list.removeFirst()).toBe('John Doe');
      expect(list._length).toBe(2);
      expect(list._head.data).toBe('Peter Pan');
    });

    it('should return `null` if list is empty', () => {
      const list = new SinglyList();

      expect(list.removeFirst()).toBe(null);
    });

    it('should remove only item and return it', () => {
      const list = new SinglyList();

      list.addLast('John Doe');

      expect(list.removeFirst()).toBe('John Doe');
      expect(list._head).toBe(null);
      expect(list._length).toBe(0);
    });
  });

  describe('removeLast', () => {
    it('should remove last item and return it', () => {
      const list = new SinglyList();

      list.addLast('John Doe');
      list.addLast('Peter Pan');
      list.addLast('Foo Bar');

      expect(list.removeLast()).toBe('Foo Bar');
      expect(list._length).toBe(2);
      expect(list.get(0).data).toBe('John Doe');
      expect(list.get(1).data).toBe('Peter Pan');
    });

    it('should return `null` if list is empty', () => {
      const list = new SinglyList();

      expect(list.removeLast()).toBe(null);
    });

    it('should remove only item and return it', () => {
      const list = new SinglyList();

      list.addLast('John Doe');

      expect(list.removeLast()).toBe('John Doe');
      expect(list._head).toBe(null);
      expect(list._length).toBe(0);
    });
  });

  describe('size', () => {
    it('should return the length of the list', () => {
      const list = new SinglyList();

      list.addLast('John Doe');
      list.addLast('Peter Pan');
      list.addLast('Foo Bar');

      expect(list.size()).toBe(3);
      expect(list.size()).toBe(list._length);
    });
  });

  describe('toArray', () => {
    it('should return the list as an Array', () => {
      const list = new SinglyList();

      list.addLast('John Doe');
      list.addLast('Peter Pan');
      list.addLast('Foo Bar');

      expect(list.toArray()).toEqual(['John Doe', 'Peter Pan', 'Foo Bar']);
    });

    it('should return empty Array if no items in list', () => {
      const list = new SinglyList();

      expect(list.toArray()).toEqual([]);
    });
  });
});
