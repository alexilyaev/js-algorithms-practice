'use strict';

/**
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

const leaves = [];

/**
 * Find all leaf node using DFS (Depth First Search)
 */
function getLeafNodesDepths(startNode, depth = 0) {
  // Found leaf node
  if (!startNode.left && !startNode.right) {
    leaves.push(depth);

    return;
  }

  getLeafNodesDepths(startNode.left, depth + 1);
  getLeafNodesDepths(startNode.right, depth + 1);

  return leaves;
}

/**
 * DFS to find all leaves depths and
 * loop over them to see one is deeper than another more than 1
 *
 * Time - O(n)
 * Space - O(n)
 */
function isSuperBalanced(rootNode) {
  const leaves = getLeafNodesDepths(rootNode);

  console.log('leaves', leaves);

  let high = 0;

  // Cache the highest depth as we go
  // Once a leaf depth is lower than the highest by more than 1, we bail
  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i];

    if (high && high - leaf > 1) {
      return false;
    }

    if (leaf > high) {
      high = leaf;
    }
  }

  return true;
}

//----------------------------------------------------------

function isSuperBalancedLoop(root) {
  let minDepth;
  let maxDepth;
  const done = false;

  while (done) {}
}

//----------------------------------------------------------

const root = new BinaryTreeNode(10);

root.insertLeft(9);
root.insertRight(8);
root.left.insertLeft(7);
root.left.insertRight(6);
root.right.insertLeft(5);
root.right.insertRight(4);
root.left.left.insertLeft(3);
root.left.left.insertRight(2);

console.log(isSuperBalanced(root));
// true

//----------------------------------------------------------

// To make it fail
root.left.left.left.insertLeft(1);
root.left.left.left.insertRight(0);

console.log(isSuperBalanced(root));
// false
