'use strict';

/**
 * MISSION:
 * Write a function to check that a binary tree is a valid binary search tree
 *
 * A binary search tree is a binary tree in which, for each node:
 * 1. The node's value is greater than all values in the left subtree
 * 2. The node's value is less than all values in the right subtree
 *
 * BSTs are useful for quick lookups. If the tree is balanced, we can search for a given value in
 * the tree in O(log n) time.
 *
 * Valid Tree:
 *   (2)
 * (1) (3)
 *
 * Invalid Tree:
 *   (1)
 * (2) (3)
 */

/**
 * Given code
 */
class BinaryTreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insertLeft(value) {
    this.left = new BinaryTreeNode(value);

    return this.left;
  }

  insertRight(value) {
    this.right = new BinaryTreeNode(value);

    return this.right;
  }
}

/**
 * Solution
 *
 * Time - O(n)
 * Space - O(n) - The most we'll have in the stack is the depth of the tree (n/d)
 */

function loopDFS(root) {
  const nodes = [root];

  while (nodes.length) {
    const node = nodes.pop();
    const left = node.left;
    const right = node.right;

    if (!left && !right) {
      continue;
    }

    if (node.value < left.value || node.value > right.value) {
      return false;
    }

    nodes.push(left, right);
  }

  return true;
}

/**
 * Tests
 */

//----------------------------------------------------------
// Valid tree

/**
 *        (4)
 *    (2)      (6)
 * (1)  (3)  (5)  (7)
 */
const tree1 = new BinaryTreeNode(4);

tree1.insertLeft(2);
tree1.insertRight(6);
tree1.left.insertLeft(1);
tree1.left.insertRight(3);
tree1.right.insertLeft(5);
tree1.right.insertRight(7);

console.log(loopDFS(tree1));
// true

//----------------------------------------------------------
// Valid tree

/**
 *        (4)
 *    (2)      (6)
 * (1)  (3)  (8)  (7)
 */
const tree2 = new BinaryTreeNode(4);

tree2.insertLeft(2);
tree2.insertRight(6);
tree2.left.insertLeft(1);
tree2.left.insertRight(3);
tree2.right.insertLeft(8);
tree2.right.insertRight(7);

console.log(loopDFS(tree2));
// false
