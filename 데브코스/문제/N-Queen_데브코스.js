function solution(n) {
  //1. n개의 행 생성하고 검사
  return search(
    Array.from({ length: n }, () => 0),
    0
  );
}

function check(queen, row) {
  for (let i = 0; i < row; i += 1) {
    if (
      queen[i] === queen[row] ||
      Math.abs(queen[i] - queen[row]) === row - i
    ) {
      return false;
    }
  }
  return true;
}
function search(queen, row) {
  const n = queen.length;
  let count = 0;

  if (n === row) {
    // 행을 전부 돌았다면, 탈출
    console.log(queen);
    return 1;
  }

  for (let col = 0; col < n; col++) {
    queen[row] = col; // 0,0
    // console.log([row, col], queen);
    if (check(queen, row)) {
      console.log("둔다", [row, queen[row], queen]);
      count += search(queen, row + 1);
    }
  }

  return count;
}

console.log(solution(4)); // 2
// console.log(solution(3)); // 2
