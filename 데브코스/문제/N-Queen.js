function solution(n) {
  let pCnt = 0;
  const makeBoard = (n) =>
    Array.from({ length: n }, () => Array(n).fill(false));

  let board = makeBoard(n);

  const togglePiece = (row, col) => {
    row === 0 && col === 0 && console.log(board);
    board[row][col] = !board[row][col];
    row === 0 && col === 0 && console.log(board);
  };

  const hasNcount = () => {
    let count = 0;
    board.map((r) =>
      r.map((v) => {
        count += v;
      })
    );
    return count;
  };

  const hasAnyQueenConflictsOn = (row, col) => {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        row === 2 &&
          col === 0 &&
          console.log([board[row][j], board[i][col], [i, j]]);
        if (board[row][j]) {
          if (j === col) continue;
          console.log("h1");
          return true;
        }
        if (board[i][col]) {
          if (i === row) continue;
          console.log("h2");
          return true;
        }
      }
    }

    return false;
  };

  function rec(row, col, board) {
    if (row >= n || col >= n) return;
    togglePiece(row, col);
    console.log("toggle", [row, col], board);
    console.log(hasAnyQueenConflictsOn(row, col));
    if (hasAnyQueenConflictsOn(row, col)) {
      togglePiece(row, col);
      return rec(row, col + 1, board);
    } else if (hasNcount() !== n) {
      return rec(row + 1, 0, board);
    } else {
      console.log("n-Quuen!!");
      pCnt = pCnt + 1;
      return board;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rec(i, j, makeBoard(n));
    }
  }

  return pCnt;
}

// console.log(solution(4)); // 2
console.log(solution(3)); // 2
