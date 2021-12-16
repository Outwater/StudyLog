function baseball(answer) {
  let chance = 10;
  function makeGuessNumber() {
    let guess = [];
    while (guess.length < 4) {
      let number = Math.floor(Math.random() * 10);
      if (!guess.includes(number)) {
        guess.push(number);
      }
    }
    return guess;
  }

  let ans = answer.split("").map((el) => Number(el));
  for (let i = 0; i < chance; i++) {
    let guess = makeGuessNumber();
    let strike = 0;
    let ball = 0;
    for (let idx = 0; idx < 4; idx++) {
      if (ans[idx] === guess[idx]) {
        strike++;
        if (strike === 4) return "정답을 맞췄습니다.";
      } else {
        for (let j = 0; j < 4; j++) {
          if (idx === j) continue;
          if (ans[idx] === guess[j]) {
            ball++;
          }
        }
      }
    }
    console.log(guess, ans);
    console.log(`${i + 1}번째 결과 ${strike}S ${ball}B 입니다.`);
  }
  return "실패입니다.";
}

console.log(baseball("1234"));
