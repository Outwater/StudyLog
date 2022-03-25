/* 
* 문제 타입
 그래프
* 난이도 및 풀이 시간
start: 16:20
end:
실제 난이도:  체감 난이도:
* 문제이해
1번 노드로 부터 가장 멀리 떨어진 노드의 개수를 리턴
* 아이디어
각 노드까지의 최단거리를 기록
[0, 0, 1, 1, 2, 2, 2] 
* 풀이방법(순서도, 절차적프로그래밍)
1. 인접리스트 만들기
2. dfs순회하며, 최단거리 기록하기
3. 최단거리 중 최대의 개수 리턴
* 시간복잡도
O()

* 복습필요여부

*/

function solution(n, vertax) {
  // 1: 인접리스트 만들기
  const matrix = Array.from({ length: n + 1 }, () => []);
  vertax.forEach(([from, to]) => {
    matrix[from].push(to);
    matrix[to].push(from);
  });
  // 2. 1로 부터 최단거리 배열 구하기 -> 최대값의 개수 리턴
  const dList = findDistance(1);
  const maxD = Math.max(...dList);
  return dList.filter((d) => d === maxD).length;

  function findDistance(start) {
    let distance = Array.from({ length: n + 1 }, () => 0);
    let visited = Array.from({ length: n + 1 }, () => false);

    visited[start] = true;
    let q = [[start, 0]];

    while (q.length > 0) {
      let [from, d] = q.shift();
      matrix[from].forEach((to) => {
        if (!visited[to]) {
          visited[to] = true;
          distance[to] = d + 1;
          q.push([to, distance[to]]);
        }
      });
    }
    return distance;
  }
}

console.log(
  solution(6, [
    [3, 6],
    [4, 3],
    [3, 2],
    [1, 3],
    [1, 2],
    [2, 4],
    [5, 2],
  ])
); //
// console.log(solution()); //
