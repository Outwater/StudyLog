/* 
* 문제 타입
 DP - 동적계획법
 작은 문제가 반복되는 지 확인
 작은 문제를 결합하여 큰 문제를 풀어낼 수 있는지 확인

 탑다운(메모이제이션), 바텀업(모든곳 방문)
* 난이도 및 풀이 시간
start:
end:
실제 난이도:lv4  체감 난이도:
* 문제이해
"무한정 존재하는 단어조각을 받아, 타겟문장을 완성하기 위해 사용해야 하는 최소 단어개수를 리턴"

* 아이디어

* 풀이방법(순서도, 절차적프로그래밍)
  let memo = [], let cnt = 0 
1. target을 쪼개어 (1 ~ t.length)까지 반복 b, ba , ban , bana, banan , banana
2. 모든 가능한 단어 리스트 구하기 , (L)
3. 쪼갠 단어가 단어집합에 있는 지 확인, 
  1) 없다면, 가지치기 // [b,a] -> b없기 때문에 가지치기
  2) 있다면, 메모이제이션에 있는 지 확인하고 더해 줌 -> b => 
  3) 있는데, 메모이제이션 없다면, 메모이제이션에 기록하고 해당 값을 더해줌 -> b => memoization(b)

* 시간복잡도
O(NlogN) 까지 가능

* 복습필요여부

*/
function solution(strs, t) {
  let memo = new Map();

  //1. 타겟 쪼개고 반복하기 (바텀업)
  for (let i = 0; i < t.length; i++) {
    let word = t.slice(0, i + 1);
    check(word);
  }

  // 2. 가능한 단어집합 만들기
  function check(word) {
    let possibleWordList = [];
    word.split("").forEach((_, idx) => {
      possibleWordList.push([word.slice(0, idx + 1), word.slice(idx + 1)]);
    });

    for (let i = 0; i < possibleWordList.length; i++) {
      insideCheck(possibleWordList[i]);
    }
  }

  // 3.단어집합 순회하며, memo값 업데이트
  function insideCheck(wordList) {
    let cnt = 0;
    for (let i = 0; i < wordList.length; i++) {
      let word = wordList[i];
      if (!word || word.length > 5) return cnt;
      // 1) 초기 단어 사전존재x, 만들어진 단어도 x
      if (!strs.includes(word) && !memo.get(word)) {
        return;
      }
      // 2) 초기 단어 사전 존재x, 중간 만들어진 단어 ㅇ
      if (!strs.includes(word) && memo.get(word)) {
        cnt += memo.get(word);
      } else {
        // 3) 초기단어 사전 존재 ㅇ, 중간 만들어진단어 x
        // 4) 초기단어 사전 ㅇ, 중간만들어진 단어 ㅇ
        cnt += 1;
        memo.set(word, 1);
      }
    }

    const fullWord = wordList.join("");
    if (!memo.get(fullWord)) {
      memo.set(fullWord, cnt);
    } else {
      if (memo.get(fullWord) > cnt) {
        memo.set(fullWord, cnt);
      }
    }
  }
  return memo.get(t) || -1;
}
console.log(solution(["ab", "na", "n", "a", "bn"], "nabnabn")); // 4
// console.log(solution(["ba", "na", "n", "a"], "banana")); // 3
// console.log(solution(["app", "ap", "p", "l", "e", "ple", "pp"], "apple")); // 2
// console.log(solution(["ba", "an", "nan", "ban", "n"], "banana")); // -1
