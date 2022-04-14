/* 
* 문제 타입

* 난이도 및 풀이 시간
start:
end:
실제 난이도:  체감 난이도:
* 문제이해

* 아이디어
  큰 값이 나오면 이전에 존재하는 작은 값들은 전부 삭제한다.
* 풀이방법(순서도, 절차적프로그래밍)
1.
2.
3.
* 시간복잡도
O(NlogN)

* 복습필요여부

*/
function solution(number, k) {
  let maxNumber = [];

  number.split("").forEach((num) => {
    let n = Number(num);
    while (k > 0 && maxNumber[maxNumber.length - 1] < n) {
      maxNumber.pop();
      k = k - 1;
    }
    maxNumber.push(num);
  });
  while (k > 0) {
    maxNumber.pop();
    k = k - 1;
  }
  return maxNumber.join("");
}

console.log(solution("1924", 2)); //94
console.log(solution("1231234", 3)); //3234
console.log(solution("4177252841", 4)); // 775841
console.log(solution("987654321", 3)); // 987654
