function baseball(answer) {
  let chance = 10;
  function makeGuessNumber() {
    let guess = [];
    while (guess.length < 4) {
      let number = Math.floor(Math.random() * 9 + 1);
      if (!guess.includes(number)) {
        guess.push(number);
      }
    }
    return guess;
  }
  function makeGuessNumber2() {
    let nums = [];
    for (let i = 1; i < 10; i++) {
      nums.push(i);
    }
    let guess = [];
    for (let n = 0; n < 4; n++) {
      let numIdx = Math.floor(Math.random() * nums.length); // 0 ~ 8
      guess.push(nums[numIdx]);
      nums.splice(numIdx, 1);
    }
    return guess;
  }

  let ans = answer.split("").map((el) => Number(el));
  for (let i = 0; i < chance; i++) {
    let guess = makeGuessNumber2();
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
