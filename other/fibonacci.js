'use strict';

/**
 * MISSION:
 * Calculate Fibonacci number for a given term in the Fibonacci sequence
 *
 * Ref:
 * https://www.mathsisfun.com/numbers/fibonacci-sequence.html
 */

/**
 * Recursion
 *
 * Time - O(2^n) - `fib` is called many times for some sub numbers O(2^n-2)
 * Space - O(n) - How deep is the recursion tree, excluding constant multipliers
 *
 * Ref:
 * Time -
 * https://stackoverflow.com/questions/360748/computational-complexity-of-fibonacci-sequence/23095023#23095023
 * Space - https://www.youtube.com/watch?v=dxyYP3BSdcQ
 */
function fibRecurs(n) {
  // console.count('fibRecurs');

  if (n <= 1) {
    return n;
  }

  return fibRecurs(n - 1) + fibRecurs(n - 2);
}

console.log(fibRecurs(8));
// 21
// `fib` called 67 times
// Takes too long from inputs above 30

/**
 * Recursion - Optimized to cache already computed results
 *
 * Time - O(n) - `fib` is called only once for each number
 * Space - O(n) - n for the cache Array and n for the call stack, so O(2n)
 */
const cache = [];

function fibRecursOptimized(n) {
  // console.count('fibRecursOptimized');

  if (n <= 1) {
    return n;
  }

  cache[n - 1] = cache[n - 1] || fibRecursOptimized(n - 1);
  cache[n - 2] = cache[n - 2] || fibRecursOptimized(n - 2);

  return cache[n - 1] + cache[n - 2];
}

console.log(fibRecursOptimized(8));
// 21
// `fib` called 9 times
// Getting "Maximum call stack size exceeded" for an input above 7840

/**
 * Regular loop
 *
 * Time - O(n)
 * Space - O(6) - Not growing, approximately the number of variables
 */
function fibLoop(n) {
  if (n <= 1) {
    return n;
  }

  let prev1 = 0;
  let prev2 = 1;
  let i;

  for (i = 2; i <= n; i++) {
    // console.count('fibLoop');

    const fib = prev1 + prev2;

    if (i === n) {
      return fib;
    }

    prev1 = prev2;
    prev2 = fib;
  }
}

console.log(fibLoop(8));
// 21
// Looped 7 iterations
// Handles anything, even 99999999

//----------------------------------------------------------

/**
 * Measure performance
 */

function median(sequence) {
  sequence.sort();

  return sequence[Math.ceil(sequence.length / 2)];
}

function time() {
  const time = process.hrtime();

  return time[0] * 1e3 + time[1] / 1e6;
}

function measure(f, ...rest) {
  const range = new Array(10).fill(undefined);

  const results = range.map(() => {
    const t0 = time();

    f.apply(null, rest);

    const t1 = time();

    return t1 - t0;
  });

  console.log(`${f.name}() took:`, median(results).toFixed(4));
}

const input = 26;

measure(fibRecurs, input);
measure(fibRecursOptimized, input);
measure(fibLoop, input);
