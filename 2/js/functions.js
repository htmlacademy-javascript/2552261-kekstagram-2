/**
 *
 * @param string the original line
 * @param maxLength max length string
 * @returns {boolean}
 * @description A function for checking the length of a string
 */
function checkStringLength(string, maxLength) {
  if (string.length <= maxLength) {
    return true;
  }
  return false;
}

// false
console.log(checkStringLength('Hello world', 5));
// true
console.log(checkStringLength('Hello', 5));

/**
 *
 * @param string the original line
 * @returns {boolean}
 * @description A function to check whether a string is a palindrome.
 */
function isPalindrome(string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reverseString += string.at(i);
  }
  if (string === reverseString) {
    return true;
  }
  return false;
}

// true
console.log(isPalindrome('ДовОд'));
// false
console.log(isPalindrome('Кекс'));
// true
console.log(isPalindrome('Лёша на полке клопа нашёл  '));

/**
 *
 * @param string the original line
 * @returns {number}
 * @description The function accepts a string and extracts the digits from 0 to 9 contained in it
 */
function getNumber(string) {
  let result = '';
  if (typeof string === 'string') {
    result = iterateString(string);
  } else {
    string = string.toString();
    result = iterateString(string);
  }
  return parseInt(result, 10);
}

function iterateString(string) {
  let result = '';
  for (let i = 0; i < string.length; i++) {
    const number = parseInt(string.at(i), 10);
    if (isNaN(number)) {
      continue;
    }
    result += number;
  }
  return result;
}

// 2023
console.log(getNumber('2023 год'));
// 2022
console.log(getNumber('ECMAScript 2022'));
// 105
console.log(getNumber('1 кефир, 0.5 батона'));
// NaN
console.log(getNumber('а я томат'));
// 1
console.log(getNumber(-1));
// 1.5
console.log(getNumber(1.5));
