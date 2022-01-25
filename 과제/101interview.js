/* 문제
Q. arr와 number 가 주어질 때, 해당 arr의 2요소를 선택해 더한 값이 number가 되는 모든 pair쌍을 리턴하라

ex. [1,2,3,4,5], 5  => (1,4), (2,3)


면접 후기:
크게 도움을 주시거나 하지는 않았다. 
완성하고 시간복잡도 물어보고, 더 나은 대안 찾아보세요 정도 
중간 이후 부터는 다른 일 하시는 듯...ㅠ fit(조금 더 시니어 찾나?)이 안 맞다고 느끼신 것 같다.

*/

//첫번째 풀이, 이중 반복분(N^2)

function solution(arr, target) {
  let result = [];
  let cnt = 0;

  for (let i = 0; i < arr.length; i++) {
    let el1 = arr[i];
    for (let j = i + 1; j < arr.length; j++) {
      cnt++;
      let el2 = arr[j];

      if (el1 + el2 === target) {
        result.push([el1, el2]);
      }
    }
  }
  return { s: "이중반복", cnt, result };
}

function solution2(arr, target) {
  let cnt = 0;
  let start = 0;
  let end = arr.length - 1;
  let result = new Set();
  function rec(start, end) {
    cnt++;
    let sum = arr[start] + arr[end];
    if (start >= end) return;
    if (sum === target) {
      result.add([arr[start], arr[end]]);
      rec(start + 1, end);
      rec(start, end - 1);
      return;
    }
    if (sum > target) {
      rec(start, end - 1);
    } else {
      rec(start + 1, end);
    }
  }
  rec(start, end);

  let uniquePairs = new Set();
  [...result].forEach((v) => uniquePairs.add(JSON.stringify(v)));

  return { s: "재귀", cnt, result: [...uniquePairs].map((v) => JSON.parse(v)) };
}

function solution3(arr, target) {
  let cnt = 0;
  let result = [];
  let start = 0;
  let end = arr.length - 1;

  for (let i = 0; i < arr.length; i++) {
    cnt++;
    if (start >= end) break;
    let sum = arr[start] + arr[end];

    if (sum === target) {
      result.push([arr[start], arr[end]]);
    }
    if (sum >= target) {
      end--;
    } else {
      start++;
    }
  }

  return { s: "O(N)_투인덱스", cnt: cnt, result: result };
}
//이중반복문 console.log(solution([1, 2, 3, 4, 5], 5));
console.log(solution([1, 3, 5, 7, 9], 10)); // 10
console.log(solution([1, 2, 3, 4, 5, 6, 7, 8, 9], 10)); // target 맞을 때 같다. // 36
console.log(solution([1, 2, 3, 4, 5, 6, 7, 8, 9], 100)); // target 안 맞을 때 같다. // 36
//recursion console.log(solution2([1, 2, 3, 4, 5], 5));
console.log(solution2([1, 3, 5, 7, 9], 10)); // 13
console.log(solution2([1, 2, 3, 4, 5, 6, 7, 8, 9], 10)); // 잘맞을 때 worst // 61
console.log(solution2([1, 2, 3, 4, 5, 6, 7, 8, 9], 100)); // target안 맞을 때 best // 9
//O(N) 줄이기 console.log(solution([1, 2, 3, 4, 5], 5));
console.log(solution3([1, 3, 5, 7, 9], 10)); // 5
console.log(solution3([1, 2, 3, 4, 5, 6, 7, 8, 9], 10)); // 9
console.log(solution3([1, 2, 3, 4, 5, 6, 7, 8, 9], 100)); //9
