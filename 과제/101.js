function emojify(message, emoji) {
  if (
    typeof message !== "number" ||
    typeof message !== "string" ||
    typeof message !== "boolean"
  )
    message = String(message);
  try {
    if (message.match(/\s/g)) {
      return message.replace(/\s/g, emoji);
    } else {
      return "invalid string";
    }
  } catch (e) {
    return "invalid string";
  }
}

console.log(emojify(" some blank spaces", "😀"));
console.log(emojify("11 11", "😀"));
console.log(emojify(1111, "😀"));
console.log(typeof true);
console.log(emojify({ hello: "world" }, "😀"));
console.log(String({ hello: "world" }));
console.log(typeof true);
console.log(typeof true);

function cmp(a, b) {
  return a - b;
}

function solution(A, B) {
  var n = A.length;
  var m = B.length;
  A.sort(cmp);
  B.sort(cmp);
  var i = 0;
  for (var k = 0; k < n; k++) {
    if (i < m - 1 && B[i] < A[k]) (i += 1), (k -= 1);
    if (A[k] == B[i]) return A[k];
  }
  return -1;
}
// console.log(solution([1, 3, 2, 1], [4, 2, 5, 3, 2]));
// console.log(solution([4, 2, 5, 3, 2], [1, 3, 2, 1]));
// console.log(solution([1, 1, 2, 3, 5], [4, 4, 4, 4, 5]));

// function solution(S, C) {
//   let targetList = [];
//   let s = S[0];
//   let target = S[0];
//   //1. 찾아내기
//   for (let i = 1; i < S.length; i++) {
//     if (S[i] === s) {
//       target += s;
//     } else {
//       target.length > 1 && targetList.push(target);
//       target = S[i];
//       s = S[i];
//     }
//   }
//   target.length > 1 && targetList.push(target);
//   console.log(targetList);

// }

function solution(S, C) {
  let total = 0;
  let mincost;

  for (let i = 1; i < S.length; i++) {
    if (S[i] === S[i - 1]) {
      if (!mincost) {
        mincost = C[i - 1];
      }
      let small = Math.min(mincost, C[i]);
      let large = Math.max(mincost, C[i]);

      total += small;
      mincost = large;
    } else {
      mincost = null;
    }
  }
  return total;
}

// console.log(solution("abccbd", [0, 1, 2, 3, 4, 5]));
// console.log(solution("aabbcc", [1, 2, 1, 2, 1, 2]));
// console.log(solution("aaaa", [3, 4, 5, 6]));
// console.log(solution("ababa", [10, 5, 10, 5, 10]));
// console.log(solution("aaabbcc", [1, 2, 3, 1, 2, 1, 2])); //5

/*
3.
*/
