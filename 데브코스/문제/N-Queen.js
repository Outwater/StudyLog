const makeBoard = (n) => Array.from({ length: n }, () => Array(n).fill(false));

const togglePiece = (row, col, board) => {
  board[row][col] = !board[row][col];
};

const hasNcount = (board) => {
  let count = 0;
  board.map((r) =>
    r.map((v) => {
      count += v;
    })
  );
  return count;
};

const hasAnyQueenConflictsOn = (board, row, col) => {
  const n = board.length;
  // 1,0
  // board[0][0]
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // console.log([i, j, row, col]); // 0,1  1,0
      if (board[row][j]) {
        if (j === col) continue;
        // console.log("h1");
        return true;
      }
      if (board[i][col]) {
        if (i === row) continue;
        // console.log("h2");
        return true;
      }
    }
  }
  return false;
};

function rec(row, col, board) {
  const n = board.length;
  if (row >= n || col >= n) return;

  togglePiece(row, col, board);
  console.log([row, col], "둔다", hasAnyQueenConflictsOn(board, row, col));
  console.log(board);
  if (hasAnyQueenConflictsOn(board, row, col)) {
    togglePiece(row, col, board);
    console.log([row, col], "뺀다");
    return rec(row, col + 1, board);
  } else if (hasNcount(board) !== n) {
    return rec(row + 1, 0, board);
  } else {
    console.log("n-looks!");
    return 1;
  }
}

function solution(n) {
  let pCnt = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      console.log("!!!!!!", [i, j], pCnt);
      pCnt += rec(i, j, makeBoard(n));
    }
  }

  return pCnt;
}

// console.log(solution(4)); // 2
console.log(solution(3)); // 2
