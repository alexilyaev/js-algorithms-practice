'use strict';

/**
 * MISSION:
 * Write a function to see if a binary tree is "superbalanced" (a tree property we just made up)
 *
 * A tree is "superbalanced" if the difference between the depths of any two leaf nodes is no
 * greater than one.
 *
 * A leaf node is a tree node with no children.
 * It's the "end" of a path to the bottom, from the root.
 *
 * Refs:
 * https://www.interviewcake.com/concept/javascript/binary-tree
 * https://www.interviewcake.com/concept/javascript/dfs
 * https://www.interviewcake.com/concept/javascript/bfs
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
 * Solutions
 */

//----------------------------------------------------------
/**
 * 1. DFS to find all leaves depths with recursion
 * 2. Loop over leaves to see if one is deeper than another by more than 1 level
 *
 * Time - O(n)
 * Space - O(n)
 */

// eslint-disable-next-line
let rootNodeVal;

function getLeafNodesDepths(currNode, depth = 0, leaves = []) {
  // Just for testing
  if (arguments.length === 1) {
    rootNodeVal = currNode.value;
  }
  // console.count('getLeafNodesDepths ' + rootNodeVal);

  // Found leaf node
  if (!currNode.left && !currNode.right) {
    leaves.push(depth);

    return;
  }

  currNode.left && getLeafNodesDepths(currNode.left, depth + 1, leaves);
  currNode.right && getLeafNodesDepths(currNode.right, depth + 1, leaves);

  return leaves;
}

function recursionDFS(rootNode) {
  const leaves = getLeafNodesDepths(rootNode);

  // console.log('leaves', leaves);

  let low = 0;
  let high = 0;

  // Cache the high and low depth as we go
  // Once they differ by more than 1, we bail
  for (let i = 0; i < leaves.length; i++) {
    // console.count('recursionDFS ' + rootNode.value);

    const leaf = leaves[i];

    if (leaf > high) {
      if (!low) {
        low = leaf;
      }

      high = leaf;
    }

    if (leaf < low) {
      low = leaf;
    }

    if (high - low > 1) {
      return false;
    }
  }

  return true;
}

//----------------------------------------------------------
/**
 * DFS with a loop and a stack
 *
 * Time - O(n)
 * Space - O(n)
 */

function loopDFS(root) {
  const stack = [];
  let minDepth = 0;
  let maxDepth = 0;
  let currDepth = 0;
  let currNode = root;

  while (currNode) {
    // console.count('loopDFS ' + root.value);

    // Found a leaf node
    if (!currNode.left && !currNode.right) {
      if (currDepth > maxDepth) {
        maxDepth = currDepth;

        if (!minDepth) {
          minDepth = maxDepth;
        }
      } else if (currDepth < minDepth) {
        minDepth = currDepth;
      }

      if (maxDepth - minDepth > 1) {
        return false;
      }
    }

    const nextDepth = currDepth + 1;
    const leftNode = currNode.left;
    const rightNode = currNode.right;

    if (leftNode) {
      if (rightNode) {
        stack.push({ node: rightNode, depth: nextDepth });
      }

      currNode = leftNode;
      currDepth = nextDepth;
      continue;
    }

    if (rightNode) {
      currNode = rightNode;
      currDepth = nextDepth;
      continue;
    }

    if (!stack.length) {
      return true;
    }

    const nextNode = stack.pop();

    currNode = nextNode.node;
    currDepth = nextNode.depth;
  }
}

/**
 * Tests
 */

//----------------------------------------------------------
// These should return true

/**
 * Tree 1:
 * 0:       (10)
 * 1:   (9)      (8)
 * 2: (7) (6)  (5)  (4)
 * 3:             (3) (2)
 */
const tree1 = new BinaryTreeNode(10);

tree1.insertLeft(9);
tree1.insertRight(8);
tree1.left.insertLeft(7);
tree1.left.insertRight(6);
tree1.right.insertLeft(5);
tree1.right.insertRight(4);
tree1.right.right.insertLeft(3);
tree1.right.right.insertRight(2);

/**
 * Tree 2:
 * 0:          (20)
 * 1:      (9)      (8)
 * 2:   (7)  (6)  (5)  (4)
 * 3: (3) (2)
 */

const tree2 = new BinaryTreeNode(20);

tree2.insertLeft(9);
tree2.insertRight(8);
tree2.left.insertLeft(7);
tree2.left.insertRight(6);
tree2.right.insertLeft(5);
tree2.right.insertRight(4);
tree2.left.left.insertLeft(3);
tree2.left.left.insertRight(2);

console.log(recursionDFS(tree1));
// true
// 9 steps recursion, 5 steps to check leaves
console.log(loopDFS(tree1));
// true
// 9 steps

console.log(recursionDFS(tree2));
// true
// 9 steps recursion, 5 steps to check leaves
console.log(loopDFS(tree2));
// true
// 9 steps

//----------------------------------------------------------
// These should return false

/**
 * Tree 1:
 * 0:       (30)
 * 1:   (9)      (8)
 * 2: (7) (6)  (5)  (4)
 * 3:             (3) (2)
 * 4:                (1)(0)
 */

tree1.value = 30;
tree1.right.right.right.insertLeft(1);
tree1.right.right.right.insertRight(0);

/**
 * Tree 2:
 * 0:          (40)
 * 1:      (9)      (8)
 * 2:   (7)  (6)  (5)  (4)
 * 3: (3) (2)        (3) (2)
 * 4:    (1)(0)         (1)(0)
 */

tree2.value = 40;
tree2.left.left.right.insertLeft(1);
tree2.left.left.right.insertRight(0);
tree2.right.right.insertLeft(3);
tree2.right.right.insertRight(2);
tree2.right.right.right.insertLeft(1);
tree2.right.right.right.insertRight(0);

console.log(recursionDFS(tree1));
// false
// 11 steps recursion, 5 steps to check leaves
console.log(loopDFS(tree1));
// false
// 10 steps

console.log(recursionDFS(tree2));
// false
// 15 steps recursion, 4 steps to check leaves
console.log(loopDFS(tree2));
// false
// 8 steps

/**
 * NOTES:
 *
 * 1. recursionDFS can be optimized to bail early:
 * Instead of a `leaves` array we'd hold maxDepth and minDepth, just like in the loopDFS solution.
 * In which case it would be as efficient but prune to a Stack Overflow error.
 *
 * 2.
 */
