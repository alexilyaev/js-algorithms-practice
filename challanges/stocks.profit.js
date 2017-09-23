'use strict';

/**
 * CHALLENGE:
 * Suppose we could access yesterday's stock prices as an array, where:
 * - The indices are the time in minutes past trade opening time, which was 9:30am local time.
 * - The values are the price in dollars of Apple stock at that time.
 *
 * So if the stock cost $500 at 10:30am, stockPricesYesterday[60] = 500.
 *
 * Write an efficient function that takes stockPricesYesterday and returns the best profit I could
 * have made from 1 purchase and 1 sale of 1 Apple stock yesterday.
 *
 * Restrictions:
 * - No "shorting" — you must buy before you sell.
 * - You may not buy and sell in the same time step (at least 1 minute must pass).
 */

/**
 * Solution
 *
 * Time - O(n)
 * Space - O(1)
 *
 * NOTES:
 * - Can also keep track of `maxProfit` only, but in the real world, we'd probably want a reference
 * to the actual pair of items to get more data.
 * - Assumption - If there's no profit opportunity, we're returning 0
 */

function setBestPair(bestPair, low, high) {
  if (high <= low) {
    return;
  }

  if (!bestPair.length) {
    bestPair.push(low, high);

    return;
  }

  if (high - low > bestPair[1] - bestPair[0]) {
    bestPair[0] = low;
    bestPair[1] = high;
  }
}

function getMaxProfit(stocks) {
  const bestPair = [];
  let low = stocks[0];
  let high = -1;

  for (let i = 0; i < stocks.length; i++) {
    const price = stocks[i];

    if (price < low) {
      setBestPair(bestPair, low, high);

      low = price;
      high = -1;
      continue;
    }

    if (price > high) {
      high = price;
    }
  }

  setBestPair(bestPair, low, high);

  if (bestPair.length) {
    return bestPair[1] - bestPair[0];
  }

  return 0;
}

/**
 * Tests
 */

//----------------------------------------------------------

const stocks1 = [10, 7, 5, 8, 11, 9];
const stocks2 = [3, 2, 3, 5, 4, 5, 7, 9, 12, 11, 10];
const stocks3 = [10, 8, 6, 4, 2, 1];
/**
 * 12 |                            *
 * 11 |
 * 10 | *
 *  9 |       *                 *
 *  8 |
 *  7 |
 *  6 |    *                 *
 *  5 |          *
 *  4 |
 *  3 |             *     *
 *  2 |
 *  1 |                *
 *  0 --|--|--|--|--|--|--|--|--|--|--|--|--|--
 */
const stocks4 = [10, 6, 9, 5, 3, 1, 3, 6, 9, 12];
/**
 * 13 |                      *
 * 12 |
 * 11 |                   *
 * 10 | *                       *
 *  9 |                *
 *  8 |          *
 *  7 |       *     *
 *  6 |    *
 *  5 |                            *
 *  4 |
 *  3 |
 *  2 |
 *  1 |                               *
 *  0 --|--|--|--|--|--|--|--|--|--|--|--|--|--
 */
const stocks5 = [10, 6, 7, 8, 7, 9, 11, 13, 10, 5, 1];

console.log(getMaxProfit(stocks1), 6);
// Buy: 5 Sell: 11
console.log(getMaxProfit(stocks2), 10);
// Buy: 2 Sell: 12
console.log(getMaxProfit(stocks3), 0);
// No profit
console.log(getMaxProfit(stocks4), 11);
// Buy: 1 Sell: 12
console.log(getMaxProfit(stocks5), 7);
// Buy: 6 Sell: 13
