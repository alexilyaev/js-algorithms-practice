'use strict';

/**
 * Fibonacci sequence with recursion
 */
function fib(n) {
  // console.count('fib');

  if (n === 0 || n === 1) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}

console.log(fib(8));
// 21
// `fib` called 67 times

/**
 * Optimized to cache already computed results
 */
const cache = {};

function fibOptimized(n) {
  // console.count('fibOptimized');

  if (n === 0 || n === 1) {
    return n;
  }

  const fibMinus1 = cache[n - 1] || fibOptimized(n - 1);
  const fibMinus2 = cache[n - 2] || fibOptimized(n - 2);

  cache[n - 1] = cache[n - 1] || fibMinus1;
  cache[n - 2] = cache[n - 2] || fibMinus2;

  return fibMinus1 + fibMinus2;
}

console.log(fibOptimized(8));
// 21
// `fib` called 9 times
