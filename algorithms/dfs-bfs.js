'use strict';

/**
 * DFS - Depth First Search
 *
 * Refs:
 * https://www.interviewcake.com/concept/javascript/dfs
 */

function dfs(rootNode, target) {
  const nodesStack = [rootNode];

  while (nodesStack.length) {
    // console.count('dfs');

    const node = nodesStack.pop();
    const { left, right } = node;

    if (node.value === target) {
      return true;
    }

    if (left) {
      nodesStack.push(left);
    }
    if (right) {
      nodesStack.push(right);
    }
  }

  return false;
}

/**
 * BFS - Breadth First Search
 *
 * Refs:
 * https://www.interviewcake.com/concept/javascript/bfs
 */

function bfs(rootNode, target) {
  const nodesQueue = [rootNode];

  while (nodesQueue.length) {
    // console.count('bfs');

    const node = nodesQueue.shift();
    const { left, right } = node;

    if (node.value === target) {
      return true;
    }

    if (left) {
      nodesQueue.push(left);
    }
    if (right) {
      nodesQueue.push(right);
    }
  }

  return false;
}

//----------------------------------------------------------

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
 * Tree 1:
 *       (10)
 *   (9)      (8)
 * (7) (6)  (5)  (4)
 *             (3) (2)
 *                (1)(0)
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
tree1.right.right.right.insertLeft(1);
tree1.right.right.right.insertRight(0);

console.log(dfs(tree1, 5), true);
// 8 steps
console.log(bfs(tree1, 5), true);
// 6 steps

/**
 * NOTES:
 *
 * 1. BFS will usually find the fastest path to a random node but will take more memory since we
 * need to store all node in a level in the queue before moving to the next level.
 * 2. DFS will usually hit leaf nodes faster
 *
 * 3. Use cases for each:
 * DFS:
 * - Find youngest member in a family tree
 * - Choose best move in a game of chess or alike
 * BFS:
 * - Find the shortest path from a starting value to a final value
 * - Find all grandchildren of a person in a family tree
 * - Friends on social media, friends of friends
 * - GPS closest places
 */
