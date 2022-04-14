/* 
* 문제 타입

* 난이도 및 풀이 시간
start:
end:
실제 난이도:  체감 난이도:
* 문제이해

* 아이디어

* 풀이방법(순서도, 절차적프로그래밍)
1.
2.
3.
* 시간복잡도
O()

* 복습필요여부

*/
function solution(number, k) {
  let maxNumber = "";
  let currIdx = 0;

  while (k > 0) {
    let target = number.slice(currIdx, currIdx + (k + 1));
    let max = Math.max(...target.split("").map((v) => Number(v)));
    console.log(["t", target, "currIdx", currIdx]);
    for (let i = 0; i < target.length; i++) {
      let currNum = Number(number[currIdx + i]);
      console.log("currNum", currNum);
      if (currNum < max && k > 0) {
        k = k - 1;
        console.log("제거", currNum);
      } else {
        maxNumber += String(currNum);
        console.log(["추가", String(currNum), maxNumber]);
      }
    }
    currIdx += target.length;
    console.log(["target", target, "answer", maxNumber], ["k", k]);
  }
  maxNumber += number.slice(currIdx);
  return maxNumber;
}

// console.log(solution("1924", 2)); //94
// console.log(solution("1231234", 3)); //3234
console.log(solution("4177252841", 4)); // 775841
