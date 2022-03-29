/* 
* 문제 타입
 DFS
* 난이도 및 풀이 시간
소요시간: 2시간30분
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
- YES

*/
let answers = [];

function solution(tickets) {
  tickets.sort((a, b) => a[1].localeCompare(b[1]));

  go("ICN", [], [], 0, tickets);

  return answers;
}

function go(start, roadmaps, visited, cnt, tickets) {
  roadmaps.push(start);

  if (cnt === tickets.length) {
    answers = roadmaps;
    return true;
  }

  for (let i = 0; i < tickets.length; i++) {
    if (tickets[i][0] === start && !visited[i]) {
      visited[i] = true;
      let isComplete = go(tickets[i][1], roadmaps, visited, cnt + 1, tickets);
      if (isComplete) {
        return true;
      }
      visited[i] = false;
      roadmaps.pop();
    }
  }
}

console.log(
  solution([
    ["ICN", "JFK"],
    ["HND", "IAD"],
    ["JFK", "HND"],
  ])
); //["ICN", "JFK", "HND", "IAD"]
console.log(
  solution([
    ["ICN", "SFO"],
    ["ICN", "ATL"],
    ["SFO", "ATL"],
    ["ATL", "ICN"],
    ["ATL", "SFO"],
  ])
); //	["ICN", "ATL", "ICN", "SFO", "ATL", "SFO"]
