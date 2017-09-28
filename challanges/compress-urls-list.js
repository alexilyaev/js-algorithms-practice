'use strict';

/**
 * CHALLENGE:
 * I wrote a crawler that visits web pages, stores a few keywords in a database, and follows links
 * to other web pages. I noticed that my crawler was wasting a lot of time visiting the same pages
 * over and over, so I made a set, visited, where I'm storing URLs I've already visited. Now the
 * crawler only visits a URL if it hasn't already been visited.
 *
 * Thing is, the crawler is running on my old desktop computer in my parents' basement, and it
 * keeps running out of memory because visited is getting so huge.
 *
 * How can I trim down the amount of space taken up by visited?
 */

/**
 * Solution
 */

/**
 * Save visited URLs as a Trie Data Structure
 *
 * Time - O(n * m) - In the worst case all urls are distinct
 * Space - O(n * m) - Same point
 */
function Trie() {
  this.root = {};
}

Trie.prototype.addStr = function(subRoot, chars) {
  for (let i = 0, ln = chars.length; i < ln; i++) {
    const char = chars[i];

    subRoot[char] = subRoot[char] || {};
    subRoot = subRoot[char];
  }

  // Mark end of string
  subRoot['*'] = true;
};

/**
 * Check if string already exists, if not, add it
 *
 * @returns {boolean} true means new string
 */
Trie.prototype.checkPresentAndAdd = function(str) {
  let isNewStr = false;
  let subRoot = this.root;

  for (let i = 0, ln = str.length; i < ln; i++) {
    const char = str[i];

    if (!subRoot[char]) {
      this.addStr(subRoot, str.slice(i));
      isNewStr = true;
      break;
    }

    subRoot = subRoot[char];
  }

  // Check we found a whole url and not just a prefix
  if (!isNewStr && !subRoot['*']) {
    subRoot['*'] = true;
    isNewStr = true;
  }

  return isNewStr;
};

// For the tests below only
Trie.prototype.isPresent = function(str) {
  let subRoot = this.root;

  for (let i = 0, ln = str.length; i < ln; i++) {
    const char = str[i];

    if (!subRoot[char]) {
      return false;
    }

    subRoot = subRoot[char];
  }

  // Check we found a whole url and not just a prefix
  return !!subRoot['*'];
};

/**
 * Tests
 */

const urls = ['donut.net', 'dogood.org', 'dog.com', 'dog.com/about', 'dog.com/pug', 'dog.org'];

const visited = new Trie();

const allUrlsInTrie = urls.every(url => {
  visited.checkPresentAndAdd(url);

  return visited.isPresent(url);
});

console.log(allUrlsInTrie, true);
