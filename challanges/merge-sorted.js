'use strict';

/**
 * CHALLENGE:
 * Given 2 sorted distinct arrays, merge them into 1 sorted array
 *
 * Assumptions:
 * - All values are unique
 * - Both arrays have at least one value
 */

/**
 * Time - O(a * b)
 * Space - O(a + b)
 */
function mergeSorted(arr1, arr2) {
  const arr1Ln = arr1.length;
  const arr2Ln = arr2.length;
  let curr1 = 0;
  let curr2 = 0;
  let done = false;
  let sorted = [];

  while (!done) {
    if (arr1[curr1] < arr2[curr2]) {
      sorted.push(arr1[curr1]);
      curr1++;

      if (curr1 === arr1Ln) {
        done = true;
        sorted = sorted.concat(arr2.slice(curr2));
      }
    } else {
      sorted.push(arr2[curr2]);
      curr2++;

      if (curr2 === arr2Ln) {
        done = true;
        sorted = sorted.concat(arr1.slice(curr1));
      }
    }
  }

  return sorted;
}

/**
 * Tests
 */

const sortedArr1 = [3, 4, 6, 10, 11, 15];
const sortedArr2 = [1, 5, 8, 12, 14, 19];

console.log(mergeSorted(sortedArr1, sortedArr2).toString());
console.log('1,3,4,5,6,8,10,11,12,14,15,19');

const sortedArr11 = [3, 4, 6, 10, 11, 15, 21, 23];
const sortedArr22 = [1, 5, 8, 12, 14, 19];

console.log(mergeSorted(sortedArr11, sortedArr22).toString());
console.log('1,3,4,5,6,8,10,11,12,14,15,19,21,23');

const sortedArr111 = [3, 4, 6, 10, 11, 15];
const sortedArr222 = [1, 5, 8, 12, 14, 19, 21, 23];

console.log(mergeSorted(sortedArr111, sortedArr222).toString());
console.log('1,3,4,5,6,8,10,11,12,14,15,19,21,23');
