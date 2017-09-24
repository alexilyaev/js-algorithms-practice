'use strict';

/**
 * CHALLENGE:
 * Find the number of items in common between two sorted, distinct arrays
 */

/**
 * Solutions
 */

/**
 * Time - O(A * B)
 * Space - O(1)
 */
function bruteForce(arr1, arr2) {
  let common = 0;

  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr1[i] === arr2[j]) {
        common++;
      }
    }
  }

  return common;
}

/**
 * Time - O(A log B)
 * Space - O(1)
 */
function isInArrayBS(arr, value) {
  let lowIndex = 0;
  let highIndex = arr.length - 1;

  while (lowIndex <= highIndex) {
    const midIndex = Math.floor((highIndex + lowIndex) / 2);
    const midItem = arr[midIndex];

    if (midItem === value) {
      return true;
    }

    if (midItem < value) {
      lowIndex = midIndex + 1;
    } else {
      highIndex = midIndex - 1;
    }
  }

  return false;
}

function binarySearch(arr1, arr2) {
  let common = 0;

  for (let i = 0; i < arr1.length; i++) {
    if (isInArrayBS(arr2, arr1[i])) {
      common++;
    }
  }

  return common;
}

/**
 * Time - O(A + B)
 * Space - O(B)
 */
function hashTable(arr1, arr2) {
  let common = 0;
  const arr1Map = {};

  for (let i = 0; i < arr1.length; i++) {
    arr1Map[arr1[i]] = true;
  }

  for (let i = 0; i < arr2.length; i++) {
    if (arr1Map[arr2[i]]) {
      common++;
    }
  }

  return common;
}

/**
 * Time - O(A + B)
 * Space - O(1)
 */
function sortedMergeSearch(arr1, arr2) {
  let common = 0;
  let arr1Pointer = 0;
  let arr2Pointer = 0;

  while (arr1Pointer < arr1.length && arr2Pointer < arr2.length) {
    const arr1Val = arr1[arr1Pointer];
    const arr2Val = arr2[arr2Pointer];

    if (arr1Val === arr2Val) {
      common++;
      arr1Pointer++;
      arr2Pointer++;
      continue;
    }

    if (arr1Val > arr2Val) {
      arr2Pointer++;
    } else {
      arr1Pointer++;
    }
  }

  return common;
}

/**
 * Tests
 */

const arr1 = [1, 12, 15, 19, 20, 21];
const arr2 = [2, 15, 17, 19, 21, 25, 27];

console.log(bruteForce(arr1, arr2), 3);
console.log(binarySearch(arr1, arr2), 3);
console.log(hashTable(arr1, arr2), 3);
console.log(sortedMergeSearch(arr1, arr2), 3);
