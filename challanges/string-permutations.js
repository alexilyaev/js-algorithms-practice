'use strict';

/**
 * CHALLENGE:
 * Find permutations of s (smaller string) within b (bigger string)
 */

/**
 * Solutions
 */

//----------------------------------------------------------

/**
 * Permutations of s with recursion, search each in b
 *
 * Time - O(s! * b)
 * Space - O(s!)
 */

function getPermutations(charsArr) {
  // console.count('getPermutations');

  if (charsArr.length === 2) {
    return [charsArr[0] + charsArr[1], charsArr[1] + charsArr[0]];
  }

  let permutations = [];

  for (let i = 0; i < charsArr.length; i++) {
    const firstChar = charsArr[i];
    const rest = charsArr.slice();

    // Remove current char so we get just the rest of the characters
    rest.splice(i, 1);

    const subP = getPermutations(rest).map(subChars => {
      return firstChar + subChars;
    });

    permutations = permutations.concat(subP);
  }

  return permutations;
}

function countInStr(needle, haystack) {
  let count = 0;

  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle[0] && haystack.substr(i, needle.length) === needle) {
      count++;
    }

    if (i >= haystack.length - needle.length) {
      break;
    }
  }

  return count;
}

function bruteForce(s, b) {
  const permutations = getPermutations(s.split(''));
  const permutationsSet = new Set(permutations);
  let count = 0;

  for (const str of permutationsSet) {
    count += countInStr(str, b);
  }

  return count;
}

//----------------------------------------------------------

/**
 * Match a range slot for each character in b against s
 *
 * Time - O(s * b)
 * Space - O(b)
 */

// Map source characters to their occurrences count
function mapCharsToCount(str, sMap) {
  const strMap = {};

  for (let i = 0, ln = str.length; i < ln; i++) {
    // console.count('mapCharsToCount');

    const char = str[i];

    // Short circuit if we get an unrelated character
    if (sMap && !sMap[char]) {
      return null;
    }

    strMap[char] = strMap[char] ? strMap[char] + 1 : 1;
  }

  return strMap;
}

// Shallow comparison between objects
function isObjsEqual(obj1, obj2) {
  for (const key in obj1) {
    if (obj1.hasOwnProperty(key) && obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

function rangeMatch(s, b) {
  const sLength = s.length;
  const sMap = mapCharsToCount(s);
  const bLength = b.length - sLength + 1;
  let foundCount = 0;

  for (let i = 0; i < bLength; i++) {
    // console.count('rangeMatch');

    const bSlot = b.substr(i, sLength);
    const bMap = mapCharsToCount(bSlot, sMap);

    // Short circuit if we had an unrelated character
    if (bMap === null) {
      continue;
    }

    if (isObjsEqual(sMap, bMap)) {
      foundCount++;
    }
  }

  return foundCount;
}

//----------------------------------------------------------

/**
 * Tests
 */

const s = 'abbcd';
const b = 'babcdbeafdbbacbddfae';

console.log(bruteForce(s, b), 4);
console.log(rangeMatch(s, b), 4);
