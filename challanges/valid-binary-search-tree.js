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
 * Space - O(n) - The most we'll have in the stack is the depth of the tree O(log n)
 *                But we can have a tree with all nodes in one branch, so O(n)
 */

function loopDFS(root) {
  const nodesStack = [
    {
      node: root,
      parent: null
    }
  ];

  while (nodesStack.length) {
    const { node, parent } = nodesStack.pop();
    const { left, right } = node;

    if (!left && !right) {
      continue;
    }

    if (node.value <= left.value || node.value >= right.value) {
      return false;
    }

    if (parent) {
      // Right subtree
      if (node.value > parent.value && left.value <= parent.value) {
        return false;
      }
      // Left subtree
      if (node.value < parent.value && right.value >= parent.value) {
        return false;
      }
    }

    nodesStack.push(
      {
        node: left,
        parent: node
      },
      {
        node: right,
        parent: node
      }
    );
  }

  return true;
}

/**
 * Tests
 */

//----------------------------------------------------------
// Valid tree

/**
 *         (50)
 *    (30)      (80)
 * (20) (40)  (70) (90)
 */
const tree1 = new BinaryTreeNode(50);

tree1.insertLeft(30);
tree1.insertRight(80);
tree1.left.insertLeft(20);
tree1.left.insertRight(40);
tree1.right.insertLeft(70);
tree1.right.insertRight(90);

console.log(loopDFS(tree1));
// true

//----------------------------------------------------------
// Invalid trees

/**
 * A left node should not be greater than it's parent
 *         (50)
 *    (30)        (80)
 * (20) (40)  _(100)_ (90)
 */
const tree2 = new BinaryTreeNode(50);

tree2.insertLeft(30);
tree2.insertRight(80);
tree2.left.insertLeft(20);
tree2.left.insertRight(40);
tree2.right.insertLeft(100);
tree2.right.insertRight(90);

console.log(loopDFS(tree2));
// false

/**
 * A right node in left subtree should not be greater of it subtree parent
 *         (50)
 *    (30)      (80)
 * (20) _(60)_  (70) (90)
 */
const tree3 = new BinaryTreeNode(50);

tree3.insertLeft(30);
tree3.insertRight(80);
tree3.left.insertLeft(20);
tree3.left.insertRight(60);
tree3.right.insertLeft(70);
tree3.right.insertRight(90);

console.log(loopDFS(tree3));
// false

/**
 * A node should not equal it's parent
 *         (50)
 *    (30)      (80)
 * (20) (40)  (70) _(80)_
 */
const tree4 = new BinaryTreeNode(50);

tree4.insertLeft(30);
tree4.insertRight(80);
tree4.left.insertLeft(20);
tree4.left.insertRight(40);
tree4.right.insertLeft(70);
tree4.right.insertRight(80);

console.log(loopDFS(tree4));
// false
