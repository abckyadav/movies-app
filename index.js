// var arr = [1, 2, 3, 7, 8, 6];

// let sum = 0;

// for (let i = 0; i < arr.length; i++) {
//   sum += arr[i];
// }

// console.log(sum);

var str = "rar";

function palindrome(str) {
  var left = 0;
  var right = str.length - 1;

  while (left < right) {
    if (str[left] != str[right]) {
      return "No";
    }
    left++;
    right--;
  }
  return "Yes";
}

palindrome(str);

import { useState } from "react";

const [state, setState] = useState(initalVAlue);
