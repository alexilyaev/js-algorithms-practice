'use strict';

/**
 * Fibonacci sequence with recursion
 * Time - O(2^n) - `fib` is called many times for some sub numbers O(2^n-2)
 * Space - O(n) - How deep is the recursion tree, excluding constant multipliers
 *
 * Ref:
 * Time - https://stackoverflow.com/questions/360748/computational-complexity-of-fibonacci-sequence/23095023#23095023
 * Space - https://www.youtube.com/watch?v=dxyYP3BSdcQ
 */
function fib(n) {
  // console.count('fib');

  if (n <= 1) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}

console.log(fib(8));
// 21
// `fib` called 67 times

/**
 * Optimized to cache already computed results
 * Time - O(n) - `fib` is called only once for each number
 * Space - O(n) - Same as above, although the call stack is significantly smaller
 *              - n for the cache Array and n for the call stack, so O(2n)
 */
const cache = [];

function fibOptimized(n) {
  // console.count('fibOptimized');

  if (n <= 1) {
    return n;
  }

  cache[n - 1] = cache[n - 1] || fibOptimized(n - 1);
  cache[n - 2] = cache[n - 2] || fibOptimized(n - 2);

  return cache[n - 1] + cache[n - 2];
}

console.log(fibOptimized(8));
// 21
// `fib` called 9 times
