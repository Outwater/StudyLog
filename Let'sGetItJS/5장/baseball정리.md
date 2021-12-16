## 순서도

1. 시작 -> 숫자를 4개 뽑는다. -> 대기
2. 정답을 제출한다.
3. 정답이 형식에 맞는지 확인한다. -> if not: error발생하고 다시 제출하도록 한다.
4. (if yes) 정답여부를 확인한다. -> (if yes) -> 승리 표시후 게임 종료
5. (if not) 시도횟수가 10회인지 확인한다. -> (if yes) -> 패배 표시 후 게임 종료
6. (if not) 시도횟수를 1회 증가, Strike & Ball을 표시한다. -> 다시 제출하도록 한다

**1.숫자 4개 뽑기**

- 1부터 9중 4개의 숫자 뽑기
  Math.random()은 '0 <= x < 1' 사이의 수를 리턴
  Math.random() _ 9는 '0 <= x < 9'
  0을 뽑지 않기 위해서는 '1 <= x < 10' 이어야 하므로
  "Math.random() _ 9 + 1"

**2. 입력값과 정답 비교하기**

- for문 보다는 배열로 만들어 처리하기
  - arr.forEach(), arr.map(), arr,filter(),...
- ex. 1~9까지 담고 있는 nums를 만들 때

  - const number = Array(9).fill().map((v,i) => i+1)
  - fill()은 배열의 요소를 undefined로 채워주는 역할
